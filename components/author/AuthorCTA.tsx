"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;
const VP = { once: false, margin: "-40px" } as const;

export function AuthorCTA() {
  return (
    <section className="py-20 lg:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 text-center flex flex-col items-center gap-5">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.5, ease: E }}
          style={{ originX: 0.5 }}
          className="w-10 h-px bg-white/20"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, delay: 0.15, ease: E }}
          className="font-bellefair text-xl text-text-secondary max-w-sm leading-relaxed"
        >
          Veinte años de historias, del monte chaqueño al policial negro.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.3, ease: E }}
        >
          <Link
            href="/libros"
            className="mt-2 inline-flex items-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-text-primary text-base transition-opacity hover:opacity-85"
          >
            Ver todas las obras
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
