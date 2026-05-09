"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Accessibility } from "lucide-react";
import { useAccessibility } from "@/components/accessibility-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/libros", label: "Libros" },
  { href: "/escuchar", label: "Escuchar" },
  { href: "/autor", label: "Autor" },
  { href: "/contacto", label: "Contacto" },
];

export function Topbar() {
  const pathname = usePathname();
  const { enabled: a11y, toggle } = useAccessibility();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [autorHidden, setAutorHidden] = useState(false);
  const isAutorPage = pathname === "/autor";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setAutorHidden(y > 12 && max > 0 && y / max < 0.82);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isAutorPage) setAutorHidden(false);
  }, [isAutorPage]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "topbar-scrolled" : "bg-transparent",
          isAutorPage && autorHidden && "-translate-y-full"
        )}
      >
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="font-cinzel text-xl lg:text-2xl font-semibold text-text-primary hover:text-white transition-colors tracking-wide"
          >
            Hugo Mitoire
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-xs tracking-[0.18em] uppercase font-medium transition-colors",
                  pathname === l.href
                    ? "text-white"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={a11y ? "Desactivar accesibilidad" : "Activar accesibilidad"}
              title={a11y ? "Accesibilidad ON" : "Accesibilidad OFF"}
              className={cn(
                "p-2 rounded-full transition-all",
                a11y
                  ? "text-[#F5CB5C] bg-[#F5CB5C]/10"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Accessibility size={17} />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-base/96 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "font-cinzel text-3xl font-semibold tracking-wider transition-colors",
                      pathname === l.href ? "text-white" : "text-text-secondary hover:text-white"
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="pb-12 flex justify-center">
              <button
                onClick={toggle}
                className={cn(
                  "flex items-center gap-2 text-xs tracking-[0.18em] uppercase transition-colors",
                  a11y ? "text-[#F5CB5C]" : "text-text-muted"
                )}
              >
                <Accessibility size={14} />
                Accesibilidad {a11y ? "ON" : "OFF"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
