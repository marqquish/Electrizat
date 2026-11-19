"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, Phone, X, Zap } from "lucide-react";
import { business, navLinks } from "@/config/site";
import { telUrl } from "@/lib/utils";
import { Logo } from "./logo";
import { ButtonLink } from "./ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-card" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <a href="#inicio" aria-label={`${business.name} – inicio`} className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-semibold text-slate-700 transition hover:text-navy">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telUrl}
            className="hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-navy md:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{business.phoneDisplay}</span>
          </a>
          <ButtonLink href="#contacto" className="hidden sm:inline-flex">
            <Zap className="h-4 w-4" aria-hidden="true" />
            Solicitar presupuesto
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-surface-mid lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movil"
            className="border-t border-line bg-white lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Menú móvil" className="container-page py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-3 text-base font-semibold text-navy hover:bg-surface-low"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-col gap-2">
                <ButtonLink href="#contacto" size="lg" onClick={() => setOpen(false)}>
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  Solicitar presupuesto
                </ButtonLink>
                <ButtonLink href={telUrl} variant="outline" size="lg">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Llamar al {business.phoneDisplay}
                </ButtonLink>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
