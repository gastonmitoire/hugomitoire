"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthorData } from "@/data/types";

export function AuthorQuote({ author }: { author: AuthorData }) {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      {/* Subtle background lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,1) 80px)",
        }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative max-w-4xl mx-auto text-center"
        >
          {/* Decorative quote marks */}
          <span
            className="font-bellefair absolute -top-8 left-0 lg:-left-8 leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(6rem, 14vw, 11rem)", color: "rgba(245,203,92,0.07)" }}
            aria-hidden
          >
            &ldquo;
          </span>
          <span
            className="font-bellefair absolute -bottom-16 right-0 lg:-right-8 leading-none select-none pointer-events-none rotate-180 inline-block"
            style={{ fontSize: "clamp(6rem, 14vw, 11rem)", color: "rgba(245,203,92,0.07)" }}
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote className="font-bellefair italic leading-relaxed text-text-primary relative z-10"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
          >
            {author.quote}
          </blockquote>
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-text-muted">
            — {author.quoteSource}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
