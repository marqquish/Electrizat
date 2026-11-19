import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { business, fullAddress } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/politica-privacidad" },
  robots: { index: false, follow: true }, // Cambiar a index: true cuando el texto esté completo.
};

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>Titular: [COMPLETAR nombre o razón social]</li>
        <li>NIF/CIF: [COMPLETAR]</li>
        <li>Dirección: {fullAddress}</li>
        <li>Teléfono: {business.phoneDisplay}</li>
        <li>Email para ejercer derechos: [COMPLETAR]</li>
      </ul>
      <h2>2. Datos que se recogen</h2>
      <p>
        Mediante el formulario de contacto se recogen: nombre, teléfono, email (opcional), tipo de servicio y el mensaje
        que escribas.
      </p>
      <h2>3. Finalidad y base jurídica</h2>
      <p>[COMPLETAR: finalidad (atender la solicitud de presupuesto) y base jurídica (consentimiento / medidas precontractuales).]</p>
      <h2>4. Destinatarios y encargados</h2>
      <p>
        Los mensajes se envían por email mediante un proveedor de envío (por defecto, Resend). [COMPLETAR: confirmar
        proveedor, ubicación y garantías de transferencias internacionales si procede.]
      </p>
      <h2>5. Plazo de conservación</h2>
      <p>[COMPLETAR]</p>
      <h2>6. Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo
        a [COMPLETAR email]. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
      </p>
    </LegalPage>
  );
}
