import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/libros", label: "Libros" },
  { href: "/autor", label: "Autor" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-surface mt-auto">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <Link href="/" className="font-cinzel text-xl font-semibold text-text-primary hover:text-white transition-colors tracking-wide block">
              Hugo Mitoire
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Escritor argentino.<br />Resistencia, Chaco.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
              Navegación
            </p>
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-4 font-medium">
              Redes
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/hugomitoire" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-muted hover:text-text-primary transition-colors">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://facebook.com/hugomitoire" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-muted hover:text-text-primary transition-colors">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">© {year} Hugo Mitoire. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
