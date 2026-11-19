import { Compass, MapPin, Phone, PhoneCall } from "lucide-react";
import { business, fullAddress } from "@/config/site";
import { telUrl, whatsappUrl } from "@/lib/utils";
import { ButtonLink } from "../ui/button";
import { WhatsAppIcon } from "../ui/whatsapp-icon";
import { Reveal } from "../motion";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-white py-14 md:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="section-eyebrow">Contacto</p>
            <h2 id="contacto-title" className="mt-2 text-[1.65rem] font-bold leading-8 sm:text-4xl sm:leading-[44px]">
              Hablemos de tu proyecto eléctrico
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Estamos en Latina (Madrid). Escríbenos o llámanos y cuéntanos qué necesitas.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 space-y-4">
            <div className="rounded-card border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Teléfono
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-navy">{business.phoneDisplay}</p>
              <ButtonLink href={telUrl} variant="dark" className="mt-3 w-full">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                Llamar ahora
              </ButtonLink>
            </div>

            <div className="rounded-card border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </p>
              <p className="mt-1 text-sm text-slate-600">Envíanos una descripción o fotos de lo que necesitas.</p>
              <ButtonLink href={whatsappUrl()} variant="whatsapp" className="mt-3 w-full" external>
                <WhatsAppIcon className="h-4 w-4" />
                Escribir por WhatsApp
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </ButtonLink>
            </div>

            <div className="rounded-card border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Ubicación
              </p>
              <address className="mt-1 not-italic font-semibold text-navy">{fullAddress}</address>
              <ButtonLink href={business.googleMapsUrl} variant="outline" className="mt-3 w-full" external>
                <Compass className="h-4 w-4" aria-hidden="true" />
                Ver en Google Maps
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative rounded-panel border border-line bg-surface p-6 shadow-float md:p-8">
            <h3 className="text-2xl font-semibold">Solicita tu presupuesto</h3>
            <p className="mb-6 mt-2 text-sm text-slate-600">
              Rellena el formulario y revisaremos tu petición para responderte lo antes posible.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
