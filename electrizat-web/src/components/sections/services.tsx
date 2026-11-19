import { ArrowRight, Lightbulb, PlugZap, ShieldCheck, Wrench, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { services, type ServiceIcon } from "@/config/site";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { ServiceCta } from "./service-cta";

const icons: Record<ServiceIcon, ReactNode> = {
  install: <Zap className="h-6 w-6" aria-hidden="true" />,
  repair: <Wrench className="h-6 w-6" aria-hidden="true" />,
  light: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
  plug: <PlugZap className="h-6 w-6" aria-hidden="true" />,
  maintenance: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
};

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-surface py-14 md:py-20">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Servicios eléctricos en Madrid</p>
            <h2 id="servicios-title" className="mt-2 text-[1.65rem] font-bold leading-8 sm:text-4xl sm:leading-[44px]">
              Especialistas en instalaciones y mantenimiento
            </h2>
            <p className="mt-3 text-slate-600">
              Trabajos adaptados a viviendas, locales comerciales y comunidades de propietarios en Madrid.
            </p>
          </div>
          <a href="#contacto" className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-amber-600">
            Consulta tu caso
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-amber transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" aria-hidden="true" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-mid text-navy-700 transition group-hover:bg-amber group-hover:text-navy">
                  {icons[service.icon]}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mb-6 mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                <ServiceCta serviceId={service.id} serviceTitle={service.title} />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
