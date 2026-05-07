"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthorData } from "@/data/types";

export function AuthorAwards({ author }: { author: AuthorData }) {
  if (!author.awards.length) return null;

  return (
    <section className="py-20 lg:py-28 border-t border-white/[0.06]">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-2">Trayectoria</p>
          <h2 className="font-cinzel text-3xl lg:text-4xl font-bold text-white tracking-wide">
            Reconocimientos
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {author.awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
              className="group grid grid-cols-[5rem_1px_1fr] lg:grid-cols-[8rem_1px_1fr] gap-0 items-stretch"
            >
              {/* Year */}
              <div className="flex items-center justify-end pr-5 lg:pr-8 py-7">
                <span className="font-cinzel text-2xl lg:text-3xl font-bold tabular-nums text-white/20 group-hover:text-white/50 transition-colors duration-300">
                  {award.year}
                </span>
              </div>

              {/* Vertical line with dot */}
              <div className="relative flex justify-center">
                <div className="absolute inset-0 w-px bg-white/[0.08] mx-auto" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors duration-300"
                  style={{ left: "calc(50% - 4px)" }}
                />
              </div>

              {/* Content */}
              <div className="pl-5 lg:pl-8 py-7 border-b border-white/[0.05] group-hover:border-white/10 transition-colors duration-300">
                <h3 className="font-cinzel text-base lg:text-lg font-semibold text-text-primary group-hover:text-white transition-colors duration-300 leading-snug">
                  {award.title}
                </h3>
                <p className="text-text-muted text-sm mt-1.5 leading-relaxed">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
