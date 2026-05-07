"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SerieData } from "@/data/types";
import { getBooksBySerie } from "@/data/books";

interface SeriesShowcaseProps {
  serie: SerieData;
}

export function SeriesShowcase({ serie }: SeriesShowcaseProps) {
  const serieBooks = getBooksBySerie(serie.slug);
  const ref = useRef<HTMLElement>(null);
  const accent = serieBooks[0]?.accentColor ?? "#C84B2F";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  if (!serieBooks.length) return null;

  const displayed = serieBooks.slice(0, 7);
  const total = displayed.length;

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ "--book-accent": accent } as React.CSSProperties}
    >
      {/* BG */}
      <motion.div style={{ x: bgX }} className="absolute inset-0 scale-110">
        <Image
          src={serieBooks[serieBooks.length - 1]?.background ?? ""}
          alt=""
          fill
          className="object-cover opacity-12"
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

          {/* Stacked covers */}
          <div className="relative flex items-center justify-center h-72 lg:h-[26rem]">
            {displayed.map((book, i) => {
              const rotateVal = (i - (total - 1) / 2) * 4.5;
              const leftPx = (i - (total - 1) / 2) * 24 - 57;
              const zIndex = hoveredIdx === i ? 30 : i;

              return (
                <motion.div
                  key={book.id}
                  className="absolute cursor-pointer"
                  style={{ left: `calc(50% + ${leftPx}px)`, zIndex }}
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  initial={{ opacity: 0, y: 24, rotate: rotateVal }}
                  whileInView={{ opacity: 1, y: 0, rotate: rotateVal }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.06,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 260, damping: 32 },
                  }}
                >
                  <Link href={`/libros/${book.slug}`}>
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={140}
                      height={187}
                      className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)] w-[114px] lg:w-[140px] h-auto"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
