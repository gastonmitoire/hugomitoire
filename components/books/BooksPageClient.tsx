"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookData, GenreData, SerieData } from "@/data/types";
import { BookCard } from "./BookCard";
import { getBooksBySerie } from "@/data/books";

interface BooksPageClientProps {
  books: BookData[];
  genres: GenreData[];
  series: SerieData[];
}

type Filter = "all" | "series" | string;

export function BooksPageClient({ books, genres, series }: BooksPageClientProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "Todos" },
    ...genres.map((g) => ({ value: g.slug, label: g.name })),
    { value: "series", label: "Series" },
  ];

  const displayBooks = useMemo(() => {
    if (filter === "all") return books;
    if (filter === "series") return [];
    return books.filter((b) => b.genreSlug === filter);
  }, [books, filter]);

  const FilterBtn = ({ value, label }: { value: Filter; label: string }) => {
    const active = filter === value;
    return (
      <button
        onClick={() => setFilter(value)}
        className="px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] font-semibold rounded-sm transition-all duration-200"
        style={
          active
            ? { background: "rgba(240,237,230,0.1)", color: "#F0EDE6", border: "1px solid rgba(240,237,230,0.18)" }
            : { background: "transparent", color: "#564F49", border: "1px solid rgba(255,255,255,0.06)" }
        }
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 lg:mb-12">
        {filters.map((f) => <FilterBtn key={f.value} {...f} />)}
      </div>

      {/* Series view */}
      {filter === "series" && (
        <div className="space-y-14">
          {series.map((serie) => {
            const serieBooks = getBooksBySerie(serie.slug);
            const accent = serieBooks[0]?.accentColor ?? "#F5CB5C";
            return (
              <div key={serie.slug}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-1 h-7 rounded-full" style={{ background: accent }} />
                  <div>
                    <h2 className="font-cinzel text-lg font-semibold text-text-primary">
                      {serie.title}
                    </h2>
                    <p className="text-text-muted text-xs mt-0.5">{serieBooks.length} tomos</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3 lg:gap-4">
                  {serieBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid view */}
      {filter !== "series" && (
        <>
          <p className="text-text-muted text-[10px] uppercase tracking-widest mb-5">
            {displayBooks.length} {filter === "all" ? "obras" : `resultado${displayBooks.length !== 1 ? "s" : ""}`}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5"
            >
              {displayBooks.map((book, i) => (
                <BookCard key={book.id} book={book} priority={i < 8} />
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
