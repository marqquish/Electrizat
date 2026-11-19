import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { business, fullAddress } from "@/config/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true }, // Cambiar a index: true cuando el texto esté completo.
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal">
      <h2>1. Datos identificativos del titular</h2>
      <ul>
        <li>Nombre comercial: {business.name}</li>
        <li>Titular (nombre o razón social): [COMPLETAR]</li>
        <li>NIF/CIF: [COMPLETAR]</li>
        <li>Domicilio: {fullAddress}</li>
        <li>Teléfono: {business.phoneDisplay}</li>
        <li>Email de contacto: [COMPLETAR]</li>
        <li>Datos de inscripción registral (si procede): [COMPLETAR]</li>
      </ul>
      <h2>2. Objeto</h2>
      <p>[COMPLETAR: descripción del objeto de la web y condiciones de uso.]</p>
      <h2>3. Propiedad intelectual</h2>
      <p>[COMPLETAR: condiciones sobre contenidos, marcas e imágenes.]</p>
      <h2>4. Responsabilidad</h2>
      <p>[COMPLETAR: limitaciones de responsabilidad.]</p>
      <h2>5. Legislación aplicable</h2>
      <p>[COMPLETAR: legislación y jurisdicción aplicables.]</p>
    </LegalPage>
  );
}
