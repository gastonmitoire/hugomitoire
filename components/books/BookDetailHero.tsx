"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BookData } from "@/data/types";
import { GenreData } from "@/data/types";
import { SerieData } from "@/data/types";
import { useIsDesktop } from "@/lib/hooks";

interface BookDetailHeroProps {
  book: BookData;
  genre?: GenreData;
  serie?: SerieData;
  serieOrder?: number;
  serieTotalBooks?: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

export function BookDetailHero({
  book,
  genre,
  serie,
  serieOrder,
  serieTotalBooks,
}: BookDetailHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const coverY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const year = new Date(book.publicationDate).getFullYear();

  return (
    <section
      ref={ref}
      className="relative min-h-[88dvh] overflow-hidden flex flex-col"
      style={{ "--book-accent": book.accentColor } as React.CSSProperties}
    >
      {/* Parallax BG */}
      <motion.div style={{ y: isDesktop ? bgY : 0 }} className="absolute inset-0 scale-110">
        <Image src={book.background} alt="" fill className="object-cover" priority quality={85} />
        <div className="absolute inset-0 bg-gradient-to-r from-base/90 via-base/70 to-base/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/50 via-transparent to-base" />
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 70% 55%, ${book.accentColor}0e, transparent)`,
        }}
      />

      {/* Back nav */}
      <div className="relative z-10 mx-auto max-w-screen-2xl w-full px-5 sm:px-8 lg:px-12 pt-28 lg:pt-32">
        <motion.div {...fadeUp(0.1)}>
          <Link
            href="/libros"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-text-muted hover:text-text-secondary transition-colors group"
          >
            <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
            Libros
          </Link>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 mx-auto max-w-screen-2xl w-full px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-16">
        {/* Left — text */}
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          {/* Breadcrumb / author */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-[10px] uppercase tracking-[0.22em] font-semibold"
            style={{ color: book.accentColor }}
          >
            Hugo Mitoire
          </motion.p>

          {/* Serie badge */}
          {serie && serieOrder && (
            <motion.div {...fadeUp(0.28)}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.16em] rounded-sm font-medium"
                style={{
                  background: `${book.accentColor}15`,
                  color: book.accentColor,
                  border: `1px solid ${book.accentColor}30`,
                }}
              >
                {serie.title} — Tomo {serieOrder}
                {serieTotalBooks ? ` de ${serieTotalBooks}` : ""}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            {...fadeUp(0.35)}
            className="font-cinzel text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.04] text-white tracking-tight"
          >
            {book.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div {...fadeUp(0.48)} className="flex items-center gap-3 flex-wrap">
            {genre && (
              <span
                className="px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] rounded-sm font-semibold"
                style={{
                  background: `${book.accentColor}18`,
                  color: book.accentColor,
                  border: `1px solid ${book.accentColor}35`,
                }}
              >
                {genre.name}
              </span>
            )}
            <span className="text-text-muted text-[10px] uppercase tracking-[0.16em]">
              {book.type}
            </span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-text-muted text-[10px] tracking-wide">{year}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.55)}
            className="font-bellefair text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-lg"
          >
            {book.description}
          </motion.p>

          {/* Scroll cue */}
          <motion.div {...fadeUp(0.7)} className="flex items-center gap-3 pt-2">
            <div className="h-px w-8" style={{ background: book.accentColor, opacity: 0.5 }} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
              {book.chapters.length > 0
                ? `${book.chapters.length} ${book.chapters.length === 1 ? "capítulo" : "capítulos"}`
                : "Próximamente"}
            </span>
          </motion.div>
        </div>

        {/* Right — cover */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: isDesktop ? coverY : 0 }}
            className="relative"
          >
            {/* Glow behind cover */}
            <div
              className="absolute inset-0 scale-[0.8] blur-3xl opacity-25 rounded-full"
              style={{ background: book.accentColor }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="relative z-10"
            >
              <Image
                src={book.cover}
                alt={book.title}
                width={320}
                height={427}
                className="drop-shadow-[0_28px_48px_rgba(0,0,0,0.88)]"
                style={{ maxHeight: "60dvh", width: "auto" }}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  );
}
