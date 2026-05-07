"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BookData } from "@/data/types";
import { getGenreBySlug } from "@/data/genres";

interface BookHeroProps {
  book: BookData;
}

const wordVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function AnimatedTitle({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap gap-x-[0.25em] gap-y-1">
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span custom={i} variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function BookHero({ book }: BookHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const genre = getGenreBySlug(book.genreSlug);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden flex items-center"
      style={{ "--book-accent": book.accentColor } as React.CSSProperties}
    >
      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image src={book.background} alt="" fill className="object-cover" priority quality={85} />
        <div className="absolute inset-0 bg-gradient-to-b from-base/65 via-base/55 to-base" />
        <div className="absolute inset-0 bg-base/35" />
      </motion.div>

      {/* Radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 65%, ${book.accentColor}12, transparent)`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-screen-2xl w-full px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-24 pb-20 min-h-[100dvh]"
      >
        {/* Text */}
        <motion.div
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 order-2 lg:order-1"
        >
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.22em] font-semibold"
            style={{ color: book.accentColor }}
          >
            Hugo Mitoire
          </motion.span>

          <h1 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] text-white tracking-tight">
            <AnimatedTitle text={book.title} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55 }}
            className="flex flex-col gap-4"
          >
            {genre && (
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="px-3 py-1 text-[10px] uppercase tracking-[0.18em] rounded-sm font-semibold"
                  style={{
                    background: `${book.accentColor}18`,
                    color: book.accentColor,
                    border: `1px solid ${book.accentColor}35`,
                  }}
                >
                  {genre.name}
                </span>
                <span className="text-text-muted text-[10px] uppercase tracking-[0.18em]">
                  {book.type}
                </span>
              </div>
            )}
            <p className="font-bellefair text-xl lg:text-2xl text-text-secondary leading-relaxed max-w-md">
              {book.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.55 }}
            className="flex items-center gap-6 pt-1"
          >
            <Link
              href={`/libros/${book.slug}`}
              className="inline-flex items-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] active:scale-100"
              style={{ background: book.accentColor, color: "#0A0A0A" }}
            >
              Ver libro
            </Link>
            <Link
              href="/libros"
              className="text-[11px] uppercase tracking-[0.18em] text-text-secondary hover:text-text-primary transition-colors"
            >
              Todas las obras →
            </Link>
          </motion.div>
        </motion.div>

        {/* Cover */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div
              className="absolute inset-0 scale-[0.85] blur-3xl opacity-30 rounded-full"
              style={{ background: book.accentColor }}
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="relative z-10"
            >
              <Image
                src={book.cover}
                alt={book.title}
                width={340}
                height={454}
                className="drop-shadow-[0_30px_50px_rgba(0,0,0,0.85)]"
                style={{ maxHeight: "68dvh", width: "auto" }}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
