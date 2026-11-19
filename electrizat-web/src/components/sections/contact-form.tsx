"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleX, LoaderCircle, Lock, Zap } from "lucide-react";
import { business, otherServiceOption, services } from "@/config/site";
import { contactSchema, serviceIds, type ContactFormValues } from "@/lib/validation";
import { telUrl } from "@/lib/utils";
import { SELECT_SERVICE_EVENT } from "./service-cta";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; delivered: boolean }
  | { kind: "error"; message: string };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", service: undefined, message: "", privacy: false, website: "" },
    mode: "onTouched",
  });

  // Preselecciona el servicio cuando se pulsa "Pedir presupuesto" en una tarjeta.
  useEffect(() => {
    const handler = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (serviceIds.includes(id)) setValue("service", id, { shouldValidate: true });
    };
    window.addEventListener(SELECT_SERVICE_EVENT, handler);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, handler);
  }, [setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus({ kind: "error", message: data.error ?? "No hemos podido enviar tu solicitud. Inténtalo de nuevo." });
        return;
      }
      setStatus({ kind: "success", delivered: Boolean(data.delivered) });
      reset();
    } catch {
      setStatus({ kind: "error", message: "No hay conexión con el servidor. Inténtalo de nuevo o llámanos." });
    }
  };

  const sending = status.kind === "sending";

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-card border border-green-200 bg-green-50 p-6 text-green-900">
        <p className="flex items-center gap-2 font-display text-lg font-semibold">
          <CircleCheck className="h-6 w-6" aria-hidden="true" />
          {status.delivered ? "¡Solicitud enviada!" : "Solicitud recibida en modo de desarrollo"}
        </p>
        <p className="mt-2 text-sm">
          {status.delivered
            ? "Gracias por escribirnos. Revisaremos tu solicitud y te contactaremos lo antes posible."
            : "El correo NO se ha enviado porque el servidor no tiene configurado el servicio de email (consulta el README). Los datos solo se han registrado en la consola del servidor."}
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-4 text-sm font-bold underline underline-offset-4">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="form-note" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">
            Nombre y apellidos *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Ej. Carlos Martínez"
            className="field"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy">
            Teléfono de contacto *
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. 612 00 00 00"
            className="field"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
          Email <span className="font-normal text-slate-500">(opcional)</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          className="field"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-navy">
          Tipo de servicio eléctrico *
        </label>
        <select
          id="service"
          className="field"
          defaultValue=""
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          {...register("service")}
        >
          <option value="" disabled>
            Selecciona el tipo de trabajo…
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.formLabel}
            </option>
          ))}
          <option value={otherServiceOption.id}>{otherServiceOption.formLabel}</option>
        </select>
        <FieldError id="service-error" message={errors.service?.message} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
          Descripción del trabajo o problema *
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Cuéntanos qué necesitas: tipo de inmueble, zona de Madrid, si es urgente…"
          className="field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot anti-spam: oculto para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No rellenes este campo</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="privacy"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-[#0B192C]"
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
            {...register("privacy")}
          />
          <label htmlFor="privacy" className="text-sm text-slate-600">
            He leído y acepto la{" "}
            <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline underline-offset-2">
              política de privacidad
            </a>{" "}
            y el tratamiento de mis datos para atender esta solicitud. *
          </label>
        </div>
        <FieldError id="privacy-error" message={errors.privacy?.message} />
      </div>

      {status.kind === "error" && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <CircleX className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            {status.message} También puedes llamarnos al{" "}
            <a href={telUrl} className="font-bold underline">
              {business.phoneDisplay}
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-bold text-navy transition hover:bg-amber-600 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          <>
            <Zap className="h-5 w-5" aria-hidden="true" />
            Enviar solicitud de presupuesto
          </>
        )}
      </button>

      <p id="form-note" className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Usaremos tus datos solo para responder a tu solicitud.
      </p>
    </form>
  );
}
