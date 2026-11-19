"use client";

import { ArrowUpRight } from "lucide-react";

export const SELECT_SERVICE_EVENT = "electrizat:select-service";

/** Enlace "Pedir presupuesto" de cada servicio: preselecciona el servicio en el formulario y baja a él. */
export function ServiceCta({ serviceId, serviceTitle }: { serviceId: string; serviceTitle: string }) {
  return (
    <a
      href="#contacto"
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }))}
      aria-label={`Pedir presupuesto: ${serviceTitle}`}
      className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-navy transition hover:text-amber-600"
    >
      Pedir presupuesto
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
