import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { business, fullAddress, navLinks } from "@/config/site";
import { telUrl } from "@/lib/utils";
import { Logo } from "./logo";
import { InstagramIcon } from "./ui/instagram-icon";

export function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-6">
            Servicios eléctricos en Madrid: instalaciones, reparaciones, iluminación y mantenimiento.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-display text-base font-semibold text-white">Navegación</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={`/${link.href}`} className="transition hover:text-amber">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Contacto directo</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber" aria-hidden="true" />
              <a href={telUrl} className="font-semibold text-white hover:text-amber">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
              <address className="not-italic">{fullAddress}</address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base font-semibold text-white">Redes</h2>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber hover:text-amber"
          >
            <InstagramIcon className="h-4 w-4" />
            {business.instagramHandle} en Instagram
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Madrid, España.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/aviso-legal" className="hover:text-amber">Aviso legal</Link></li>
            <li><Link href="/politica-privacidad" className="hover:text-amber">Política de privacidad</Link></li>
            <li><Link href="/politica-cookies" className="hover:text-amber">Política de cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
