import { Phone } from "lucide-react";
import { business } from "@/config/site";
import { telUrl, whatsappUrl } from "@/lib/utils";
import { WhatsAppIcon } from "./ui/whatsapp-icon";

/** Botón flotante de WhatsApp (todas las pantallas) + botón de llamada solo en móvil. */
export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <a
        href={telUrl}
        aria-label={`Llamar al ${business.phoneDisplay}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-float transition hover:bg-navy-700 md:hidden"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
        className="flex h-14 items-center gap-2 rounded-full bg-whatsapp px-4 text-navy shadow-float transition hover:scale-105 hover:bg-[#1fb957] motion-reduce:hover:scale-100 md:px-5"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="hidden text-sm font-bold md:inline">WhatsApp</span>
      </a>
    </div>
  );
}
