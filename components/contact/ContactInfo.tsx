"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { AuthorData } from "@/data/types";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
});

interface ContactInfoProps {
  author: AuthorData;
}

export function ContactInfo({ author }: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-8 lg:sticky lg:top-36">
      <div>
        <motion.p {...fadeUp(0.05)} className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-3">
          Hugo Mitoire
        </motion.p>
        <motion.h1 {...fadeUp(0.12)} className="font-cinzel text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.04]">
          Contacto
        </motion.h1>
        <motion.div {...fadeUp(0.18)} className="mt-5 h-px w-16 bg-white/20" />
      </div>

      <motion.p {...fadeUp(0.24)} className="font-bellefair text-xl text-text-secondary leading-relaxed max-w-sm">
        Para consultas sobre libros, presentaciones, talleres o cualquier otro tema, escribí un mensaje y Hugo te responde a la brevedad.
      </motion.p>

      <motion.div {...fadeUp(0.32)} className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-text-muted">
          <MapPin size={13} className="shrink-0" />
          <span className="text-sm">{author.origin}</span>
        </div>

        <div className="flex items-center gap-4 pt-1">
          {author.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              {link.platform === "instagram" ? (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/>
                </svg>
              ) : (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              )}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
