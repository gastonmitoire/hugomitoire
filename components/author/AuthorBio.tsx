"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthorData } from "@/data/types";

const PULL_QUOTE = "Su prosa directa y su oído para el habla coloquial lo convierten en un narrador visceral e inmediato.";

export function AuthorBio({ author }: { author: AuthorData }) {
  return (
    <section className="py-20 lg:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Left — sticky label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:sticky lg:top-36 self-start"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-2">
              Sobre el autor
            </p>
            <h2 className="font-cinzel text-2xl lg:text-3xl font-bold text-white tracking-wide leading-tight">
              Voz del<br />interior
            </h2>
            <div className="mt-5 h-px w-12 bg-white/20" />
          </motion.div>

          {/* Right — bio text */}
          <div className="flex flex-col gap-8">
            {author.bio.map((paragraph, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {/* First paragraph gets drop cap */}
                {i === 0 ? (
                  <p className="font-bellefair text-lg text-text-secondary leading-[1.85] first-letter:font-cinzel first-letter:text-[3.5rem] first-letter:font-bold first-letter:text-white first-letter:float-left first-letter:leading-[0.75] first-letter:mr-2 first-letter:mt-1">
                    {paragraph}
                  </p>
                ) : (
                  <p className="font-bellefair text-lg text-text-secondary leading-[1.85]">
                    {paragraph}
                  </p>
                )}

                {/* Pull quote after second paragraph */}
                {i === 1 && (
                  <motion.blockquote
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                    className="mt-8 pl-5 border-l-2 border-white/20"
                  >
                    <p className="font-bellefair text-xl lg:text-2xl text-text-primary italic leading-relaxed">
                      &ldquo;{PULL_QUOTE}&rdquo;
                    </p>
                  </motion.blockquote>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
