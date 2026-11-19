import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="contenido" className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">Página no encontrada</h1>
      <p className="mt-3 text-slate-600">La página que buscas no existe o se ha movido.</p>
      <ButtonLink href="/" size="lg" className="mt-6">Volver al inicio</ButtonLink>
    </main>
  );
}
