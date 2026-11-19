import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de cookies",
  alternates: { canonical: "/politica-cookies" },
  robots: { index: false, follow: true }, // Cambiar a index: true cuando el texto esté completo.
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <h2>1. Cookies que usa esta web</h2>
      <p>
        Actualmente la web <strong>no utiliza cookies de analítica, publicidad ni seguimiento</strong>, por lo que no se
        muestra banner de consentimiento. Si en el futuro se añade analítica (por ejemplo Google Analytics) o cualquier
        otra cookie no esencial, deberá incorporarse un banner de consentimiento y no cargarse ningún script de seguimiento
        antes de que el usuario lo acepte.
      </p>
      <h2>2. Servicios de terceros</h2>
      <p>
        Los enlaces a Google Maps, WhatsApp e Instagram abren sitios externos con sus propias políticas. [COMPLETAR si se
        incorporan mapas incrustados u otros servicios.]
      </p>
      <h2>3. Cómo gestionar las cookies</h2>
      <p>[COMPLETAR: instrucciones para configurar cookies en los navegadores más habituales.]</p>
    </LegalPage>
  );
}
