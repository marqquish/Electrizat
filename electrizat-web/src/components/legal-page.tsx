import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./logo";
import { Footer } from "./footer";

/** Contenedor común de las páginas legales (marcadores editables). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" aria-label="ELECTRIZAT – inicio"><Logo /></Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-amber-600">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a la web
          </Link>
        </div>
      </header>
      <main id="contenido" className="container-page max-w-3xl py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-4 rounded-lg border border-amber/60 bg-amber/10 p-4 text-sm text-navy">
          <strong>Documento provisional.</strong> Los textos entre corchetes [ ] son marcadores que debe completar el titular
          del negocio con sus datos reales. Este texto no es asesoramiento legal: conviene revisarlo con un profesional
          antes de publicar la web.
        </p>
        <div className="mt-8 space-y-4 leading-7 text-slate-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
