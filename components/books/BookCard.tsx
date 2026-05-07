"use client";

import React from "react";
import Link from "next/link";
import { FadeImage } from "@/components/ui/FadeImage";
import { motion } from "framer-motion";
import { BookData } from "@/data/types";
import { getGenreBySlug } from "@/data/genres";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: BookData;
  priority?: boolean;
  className?: string;
}

export function BookCard({ book, priority = false, className }: BookCardProps) {
  const genre = getGenreBySlug(book.genreSlug);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn("group h-full", className)}
      style={{ "--book-accent": book.accentColor } as React.CSSProperties}
    >
      <Link href={`/libros/${book.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
        <article className="book-card relative flex flex-col bg-surface rounded-sm overflow-hidden h-full">
          {/* Cover */}
          <div className="relative aspect-[3/4] overflow-hidden bg-elevated">
            <FadeImage
              src={book.cover}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              priority={priority}
              duration={600}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {book.serieSlug && (
              <span
                className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase rounded-sm"
                style={{
                  background: `${book.accentColor}20`,
                  color: book.accentColor,
                  border: `1px solid ${book.accentColor}40`,
                }}
              >
                Tomo {book.serieOrder}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="px-3.5 py-3 flex flex-col gap-1">
            {genre && (
              <span
                className="text-[9px] uppercase tracking-[0.15em] font-semibold"
                style={{ color: book.accentColor }}
              >
                {genre.name}
              </span>
            )}
            <h3 className="font-cinzel text-[13px] font-semibold text-text-primary leading-snug line-clamp-2">
              {book.title}
            </h3>
            <p className="text-text-muted text-[11px] leading-relaxed line-clamp-1 mt-0.5">
              {book.description}
            </p>
          </div>

          {/* Accent bottom bar */}
          <div className="accent-bar h-[2px] mt-auto" />
        </article>
      </Link>
    </motion.div>
  );
}
