import Image from "next/image";
import { Building, MessageCircle, Phone, ReceiptText, UserCheck } from "lucide-react";
import type { ReactNode } from "react";
import { benefits, business, images } from "@/config/site";
import { telUrl } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "../motion";

const benefitIcons: Record<(typeof benefits)[number]["icon"], ReactNode> = {
  user: <UserCheck className="h-5 w-5" aria-hidden="true" />,
  chat: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
  quote: <ReceiptText className="h-5 w-5" aria-hidden="true" />,
  pin: <Building className="h-5 w-5" aria-hidden="true" />,
};

export function About() {
  const { score, outOf, reviews } = business.googleRating;
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="bg-white py-14 md:py-20">
      <div className="container-page grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Reveal>
            <p className="section-eyebrow">¿Por qué elegir ELECTRIZAT?</p>
            <h2 id="nosotros-title" className="mt-2 text-[1.65rem] font-bold leading-8 sm:text-4xl sm:leading-[44px]">
              Atención cercana y trabajo bien explicado
            </h2>
            <p className="mt-4 max-w-xl text-slate-600">
              ELECTRIZAT es un servicio eléctrico situado en el barrio de Latina, en Madrid. Te escuchamos, te explicamos
              qué hace falta y te ayudamos a resolver tu instalación o avería eléctrica.
            </p>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="h-full rounded-card border border-line bg-surface p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy-700 shadow-card">
                    {benefitIcons[b.icon]}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{b.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-panel border border-line bg-white shadow-float">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              width={images.about.width}
              height={images.about.height}
              loading="lazy"
              unoptimized={images.about.src.endsWith(".svg")}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-56 w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm font-bold text-navy">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" aria-hidden="true" />
                  Compromiso ELECTRIZAT
                </p>
                <p className="text-xs text-slate-500">
                  {business.address.city}, {business.address.district}
                </p>
              </div>
              <p className="mt-4 text-slate-700">
                En cada vivienda, local o comunidad en la que intervenimos, nuestro objetivo es cuidar la seguridad de las
                personas y el buen estado de la instalación.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-navy-700">
                <li className="rounded-full bg-surface-mid px-3 py-1.5">
                  {score}/{outOf} en Google · {reviews} reseñas
                </li>
                <li className="rounded-full bg-surface-mid px-3 py-1.5">Madrid y alrededores</li>
                <li className="rounded-full bg-surface-mid px-3 py-1.5">Teléfono y WhatsApp</li>
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-navy p-4 text-white">
                <div>
                  <p className="font-display text-base font-semibold">¿Necesitas una revisión eléctrica?</p>
                  <p className="text-sm text-slate-300">Llámanos o escríbenos y lo vemos.</p>
                </div>
                <a
                  href={telUrl}
                  aria-label={`Llamar al ${business.phoneDisplay}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber text-navy transition hover:bg-amber-600"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
