"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthorData } from "@/data/types";

const VP = { once: true, margin: "-60px" } as const;
const E = [0.16, 1, 0.3, 1] as const;

const PULL_QUOTE =
  "Su prosa directa y su oído para el habla coloquial lo convierten en un narrador visceral e inmediato.";

export function AuthorBio({ author }: { author: AuthorData }) {
  return (
    <section id="autor-bio" className="py-20 lg:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Left — título converge desde ambos lados */}
          <div className="lg:sticky lg:top-36 self-start">
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: E }}
              className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-2"
            >
              Sobre el autor
            </motion.p>

            {/* "Voz del" entra desde la izquierda, "interior" desde la derecha */}
            <h2 className="font-cinzel text-2xl lg:text-3xl font-bold text-white tracking-wide leading-tight overflow-hidden">
              <motion.span
                initial={{ x: -80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.75, delay: 0.1, ease: E }}
                className="block"
              >
                Voz del
              </motion.span>
              <motion.span
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.75, delay: 0.22, ease: E }}
                className="block"
              >
                interior
              </motion.span>
            </h2>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.45, ease: E }}
              className="mt-5 h-px w-12 bg-white/20"
            />
          </div>

          {/* Right — párrafos entran con mayor stagger y distancia */}
          <div className="flex flex-col gap-8">
            {author.bio.map((paragraph, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.18, duration: 0.75, ease: E }}
              >
                {i === 0 ? (
                  <p className="font-bellefair text-lg text-text-secondary leading-[1.85] first-letter:font-cinzel first-letter:text-[3.5rem] first-letter:font-bold first-letter:text-white first-letter:float-left first-letter:leading-[0.75] first-letter:mr-2 first-letter:mt-1">
                    {paragraph}
                  </p>
                ) : (
                  <p className="font-bellefair text-lg text-text-secondary leading-[1.85]">
                    {paragraph}
                  </p>
                )}

                {i === 1 && (
                  <motion.blockquote
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VP}
                    transition={{ duration: 0.8, ease: E }}
                    className="mt-8 pl-5 relative"
                  >
                    {/* Línea izquierda que se dibuja hacia abajo */}
                    <motion.div
                      initial={{ scaleY: 0, originY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={VP}
                      transition={{ duration: 0.55, ease: E }}
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/20"
                    />
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
