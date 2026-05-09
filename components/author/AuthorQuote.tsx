"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthorData } from "@/data/types";

const VP = { once: true, margin: "-80px" } as const;
const E = [0.16, 1, 0.3, 1] as const;

export function AuthorQuote({ author }: { author: AuthorData }) {
  return (
    <section id="autor-pensamiento" className="relative py-24 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,1) 80px)",
        }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <div className="relative max-w-4xl mx-auto text-center">

          {/* Comilla izquierda — entra desde la izquierda */}
          <motion.span
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.9, ease: E }}
            className="font-bellefair absolute -top-8 left-0 lg:-left-8 leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(6rem, 14vw, 11rem)", color: "rgba(245,203,92,0.07)" }}
            aria-hidden
          >
            &ldquo;
          </motion.span>

          {/* Comilla derecha — entra desde la derecha */}
          <motion.span
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.9, delay: 0.1, ease: E }}
            className="font-bellefair absolute -bottom-16 right-0 lg:-right-8 leading-none select-none pointer-events-none rotate-180 inline-block"
            style={{ fontSize: "clamp(6rem, 14vw, 11rem)", color: "rgba(245,203,92,0.07)" }}
            aria-hidden
          >
            &ldquo;
          </motion.span>

          {/* Cita — sube desde abajo con ligero scale */}
          <motion.blockquote
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VP}
            transition={{ duration: 1.1, delay: 0.2, ease: E }}
            className="font-bellefair italic leading-relaxed text-text-primary relative z-10"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
          >
            {author.quote}
          </motion.blockquote>

          {/* Atribución — aparece sola al final */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.85, ease: E }}
            className="mt-6 text-[10px] uppercase tracking-[0.25em] text-text-muted"
          >
            — {author.quoteSource}
          </motion.p>

        </div>
      </div>
    </section>
  );
}
