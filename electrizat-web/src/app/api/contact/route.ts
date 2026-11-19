import { NextResponse } from "next/server";
import { contactSchema, serviceLabel } from "@/lib/validation";

export const runtime = "nodejs";

type ApiResponse =
  | { ok: true; delivered: boolean; mode: "email" | "dev-log" }
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };

/* Límite de peticiones muy básico (en memoria, por instancia). Suficiente contra abuso casual. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: ApiResponse, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Solicitud no válida." }, 400);
  }

  // Honeypot: si el campo oculto viene relleno es un bot. Respondemos "ok" sin enviar nada.
  if (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as Record<string, unknown>).website === "string" &&
    ((payload as Record<string, unknown>).website as string).length > 0
  ) {
    return json({ ok: true, delivered: false, mode: "dev-log" });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Demasiados intentos. Espera unos minutos o llámanos por teléfono." }, 429);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Revisa los campos del formulario.", fieldErrors: parsed.error.flatten().fieldErrors },
      422,
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "ELECTRIZAT Web <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Fallback de desarrollo: NO se envía ningún email, solo se registra en la consola del servidor.
      console.info("[contacto] Modo desarrollo: email NO enviado (faltan RESEND_API_KEY / CONTACT_TO_EMAIL).", {
        name: data.name,
        phone: data.phone,
        email: data.email || "(no indicado)",
        service: serviceLabel(data.service),
        message: data.message,
      });
      return json({ ok: true, delivered: false, mode: "dev-log" });
    }
    console.error("[contacto] Faltan RESEND_API_KEY o CONTACT_TO_EMAIL en producción.");
    return json(
      { ok: false, error: "El envío no está disponible ahora mismo. Llámanos o escríbenos por WhatsApp." },
      503,
    );
  }

  const service = serviceLabel(data.service);
  const html = `
    <h2>Nueva solicitud de presupuesto</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${data.email ? escapeHtml(data.email) : "No indicado"}</p>
    <p><strong>Servicio:</strong> ${escapeHtml(service)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  `;
  const text = `Nueva solicitud de presupuesto\n\nNombre: ${data.name}\nTeléfono: ${data.phone}\nEmail: ${data.email || "No indicado"}\nServicio: ${service}\n\nMensaje:\n${data.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Solicitud de presupuesto – ${service} – ${data.name}`,
        html,
        text,
        ...(data.email ? { reply_to: data.email } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[contacto] Resend respondió con error:", res.status, await res.text());
      return json({ ok: false, error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo o llámanos." }, 502);
    }
    return json({ ok: true, delivered: true, mode: "email" });
  } catch (error) {
    console.error("[contacto] Error de red al contactar con Resend:", error);
    return json({ ok: false, error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo o llámanos." }, 502);
  }
}
