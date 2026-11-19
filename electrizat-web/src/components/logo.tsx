import { Zap } from "lucide-react";
import { business } from "@/config/site";

/** Logotipo provisional en texto/SVG. PENDIENTE: sustituir por el logotipo oficial si existe. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-amber ${light ? "bg-white/10" : "bg-navy"}`}>
        <Zap className="h-5 w-5" fill="currentColor" aria-hidden="true" />
      </span>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>
        {business.name}
      </span>
    </span>
  );
}
