import { z } from "zod";
import { services, otherServiceOption } from "@/config/site";

/** Teléfono español: 9 dígitos que empiezan por 6-9, con prefijo +34/0034 opcional. */
const PHONE_REGEX = /^(?:\+34|0034)?[\s.-]?[6-9](?:[\s.-]?\d){8}$/;

export const serviceIds: [string, ...string[]] = [otherServiceOption.id, ...services.map((s) => s.id)];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre (mínimo 2 caracteres).")
    .max(100, "El nombre es demasiado largo."),
  phone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Introduce un teléfono válido, por ejemplo 612 34 56 78."),
  email: z
    .string()
    .trim()
    .max(150, "El email es demasiado largo.")
    .refine((v) => v === "" || z.email().safeParse(v).success, "Introduce un email válido o déjalo vacío."),
  service: z.enum(serviceIds, { error: "Selecciona el tipo de trabajo." }),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "El mensaje es demasiado largo (máximo 2000 caracteres)."),
  privacy: z.boolean().refine((v) => v === true, "Debes aceptar la política de privacidad para enviar la solicitud."),
  /** Honeypot: los usuarios reales nunca lo rellenan. */
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function serviceLabel(id: string): string {
  return [...services, otherServiceOption].find((s) => s.id === id)?.formLabel ?? id;
}
