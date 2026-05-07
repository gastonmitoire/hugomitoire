"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { FadeImage } from "@/components/ui/FadeImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { SerieData } from "@/data/types";
import { getBooksBySerie } from "@/data/books";
import { useIsDesktop } from "@/lib/hooks";

interface SeriesShowcaseProps {
  serie: SerieData;
}

// Rotaciones por posición en la grilla 3×3
const ROTATIONS = [
  [-6,  1,  5],
  [ 4, -2,  4],
  [-5,  2, -5],
];

export function SeriesShowcase({ serie }: SeriesShowcaseProps) {
  const serieBooks = getBooksBySerie(serie.slug);
  const ref = useRef<HTMLElement>(null);
  const accent = serieBooks[0]?.accentColor ?? "#C84B2F";
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  if (!serieBooks.length) return null;

  const rows = [
    serieBooks.slice(0, 3),
    serieBooks.slice(3, 6),
    serieBooks.slice(6, 9),
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ "--book-accent": accent } as React.CSSProperties}
    >
      {/* BG */}
      <motion.div style={{ x: isDesktop ? bgX : 0 }} className="absolute inset-0 scale-110">
        <FadeImage
          src={serieBooks[serieBooks.length - 1]?.background ?? ""}
          alt=""
          fill
          className="object-cover"
          finalOpacity={0.12}
          duration={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/92 to-base/60" />
        <div className="absolute inset-0 bg-base/50" />
      </motion.div>

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: accent }} />

      <div className="relative mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col gap-6"
          >
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.22em] font-semibold"
                style={{ color: accent }}
              >
                Serie completa · {serieBooks.length} tomos
              </span>
              <h2 className="font-cinzel text-4xl lg:text-5xl font-bold text-white mt-2 leading-tight">
                {serie.title}
              </h2>
            </div>
            <p className="font-bellefair text-lg text-text-secondary leading-relaxed max-w-lg">
              {serie.description}
            </p>
            <Link
              href="/libros"
              className="self-start inline-flex items-center px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-85 active:opacity-70"
              style={{ background: accent, color: "#0A0A0A" }}
            >
              Ver la serie
            </Link>
          </motion.div>

          {/* 3×3 grid */}
          <div className="flex flex-col items-center gap-3">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex items-end justify-center gap-2">
                {row.map((book, colIdx) => {
                  const rotate = ROTATIONS[rowIdx]?.[colIdx] ?? 0;
                  const globalIdx = rowIdx * 3 + colIdx;
                  const isHovered = hoveredId === book.id;

                  return (
                    <motion.div
                      key={book.id}
                      onHoverStart={() => setHoveredId(book.id)}
                      onHoverEnd={() => setHoveredId(null)}
                      initial={{ opacity: 0, y: 20, rotate }}
                      whileInView={{ opacity: 1, y: 0, rotate }}
                      viewport={{ once: true }}
                      transition={{
                        delay: globalIdx * 0.055,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      whileHover={{
                        y: -12,
                        scale: 1.06,
                        rotate: 0,
                        transition: { type: "spring", stiffness: 260, damping: 32 },
                      }}
                      style={{ zIndex: isHovered ? 20 : 1 }}
                      className="cursor-pointer relative"
                    >
                      <Link href={`/libros/${book.slug}`}>
                        <FadeImage
                          src={book.cover}
                          alt={book.title}
                          width={120}
                          height={160}
                          className="drop-shadow-[0_6px_18px_rgba(0,0,0,0.75)] w-[88px] lg:w-[108px] h-auto"
                          duration={500}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
