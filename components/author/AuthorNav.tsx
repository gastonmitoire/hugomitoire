"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "autor-hero", label: "Inicio" },
  { id: "autor-pensamiento", label: "Pensamiento" },
  { id: "autor-historia", label: "Historia" },
  { id: "autor-bio", label: "Obra" },
  { id: "autor-numeros", label: "Números" },
  { id: "autor-trayectoria", label: "Trayectoria" },
];

export function AuthorNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const map = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          map.set(e.target.id, e.intersectionRatio);
        });
        let best = "";
        let bestRatio = -1;
        map.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observersRef.current = [observer];
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={label}
            className="flex items-center gap-2.5 group"
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                  className="text-[9px] uppercase tracking-[0.2em] text-text-muted whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                width: isActive ? 16 : 5,
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.28,
              }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-[3px] rounded-full bg-text-primary"
            />
          </button>
        );
      })}
    </div>
  );
}
