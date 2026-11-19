import Image from "next/image";
import { ArrowRight, MapPin, Phone, ShieldCheck, Zap } from "lucide-react";
import { business, images } from "@/config/site";
import { telUrl, whatsappUrl } from "@/lib/utils";
import { ButtonLink } from "../ui/button";
import { WhatsAppIcon } from "../ui/whatsapp-icon";
import { HeroIn } from "../motion";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-surface">
      <div className="container-page grid items-center gap-10 py-10 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <HeroIn>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold text-navy-700">
              <Zap className="h-3.5 w-3.5 text-amber" fill="currentColor" aria-hidden="true" />
              Electricistas en Madrid
            </p>
          </HeroIn>
          <HeroIn delay={0.08}>
            <h1 id="hero-title" className="mt-5 text-[2rem] font-bold leading-10 sm:text-5xl sm:leading-[56px]">
              Soluciones eléctricas profesionales en <span className="text-amber-600">Madrid</span>
            </h1>
          </HeroIn>
          <HeroIn delay={0.16}>
            <p className="mt-5 max-w-xl text-lg leading-7 text-slate-600">
              Instalaciones, reparaciones y mantenimiento eléctrico para viviendas, locales y comunidades en Madrid.
              Cuéntanos qué necesitas y te ayudamos a resolverlo.
            </p>
          </HeroIn>
          <HeroIn delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contacto" size="lg">
              <Zap className="h-5 w-5" aria-hidden="true" />
              Solicitar presupuesto
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="whatsapp" size="lg" external>
              <WhatsAppIcon className="h-5 w-5" />
              Contactar por WhatsApp
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </ButtonLink>
          </HeroIn>
          <HeroIn delay={0.3}>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
              <Phone className="h-4 w-4" aria-hidden="true" />
              ¿Prefieres hablar con nosotros? Llámanos al
              <a href={telUrl} className="font-bold text-navy underline-offset-4 hover:underline">
                {business.phoneDisplay}
              </a>
            </p>
          </HeroIn>
        </div>

        <HeroIn delay={0.15} x={24} className="relative">
          <div className="relative overflow-hidden rounded-panel border border-line bg-navy shadow-float">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              width={images.hero.width}
              height={images.hero.height}
              priority
              unoptimized={images.hero.src.endsWith(".svg")}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-[380px] w-full object-cover object-top sm:h-[430px] lg:h-[490px]"
            />
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-float sm:left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-mid text-navy-700">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold text-navy">Servicio en Madrid</span>
              <span className="block text-xs text-slate-600">{business.address.district} y alrededores</span>
            </span>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-navy/95 px-3.5 py-2 text-xs font-bold text-white shadow-lift">
            <ShieldCheck className="h-4 w-4 text-amber" aria-hidden="true" />
            Pide tu presupuesto
          </div>
        </HeroIn>
      </div>
    </section>
  );
}
