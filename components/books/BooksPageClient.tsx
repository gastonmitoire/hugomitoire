"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, LayoutGrid, List, Layers } from "lucide-react";
import { BookData, GenreData, SerieData } from "@/data/types";
import { BookCard } from "./BookCard";
import { FadeImage } from "@/components/ui/FadeImage";
import { getBooksBySerie } from "@/data/books";
import { getGenreBySlug } from "@/data/genres";
import { cn } from "@/lib/utils";

interface BooksPageClientProps {
  books: BookData[];
  genres: GenreData[];
  series: SerieData[];
}

type Filter = "all" | "series" | string;
type ViewMode = "grid" | "list" | "covers";

// ─── List row ────────────────────────────────────────────────────────────────

function BookRow({ book, index }: { book: BookData; index: number }) {
  const genre = getGenreBySlug(book.genreSlug);
  const year = new Date(book.publicationDate).getFullYear();

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.025, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link
        href={`/libros/${book.slug}`}
        className="group flex items-center gap-4 py-3.5 border-b border-white/[0.06] hover:border-white/12 transition-all duration-200"
        style={{ "--book-accent": book.accentColor } as React.CSSProperties}
      >
        {/* Accent bar */}
        <div
          className="w-[2px] h-10 rounded-full shrink-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          style={{ background: book.accentColor }}
        />

        {/* Cover */}
        <div className="relative w-9 h-12 shrink-0 overflow-hidden rounded-sm bg-elevated">
          <FadeImage src={book.cover} alt={book.title} fill className="object-cover" duration={400} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-8">
          <div className="min-w-0 sm:w-56 lg:w-72 shrink-0">
            {genre && (
              <p
                className="text-[9px] uppercase tracking-[0.18em] font-semibold leading-none mb-1"
                style={{ color: book.accentColor }}
              >
                {genre.name}
              </p>
            )}
            <h3 className="font-cinzel text-sm font-semibold text-text-primary group-hover:text-white transition-colors duration-200 truncate">
              {book.title}
            </h3>
          </div>
          <p className="hidden sm:block text-text-muted text-[12px] leading-relaxed line-clamp-1 flex-1 min-w-0">
            {book.description}
          </p>
        </div>

        {/* Year + arrow */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden lg:block text-[10px] text-text-muted tabular-nums">{year}</span>
          <span className="text-text-muted text-sm translate-x-0 group-hover:translate-x-1 opacity-30 group-hover:opacity-70 transition-all duration-200">
            →
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

// ─── Cover tile ──────────────────────────────────────────────────────────────

function CoverTile({ book, index }: { book: BookData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.022, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link
        href={`/libros/${book.slug}`}
        className="group block relative aspect-[3/4] overflow-hidden rounded-sm bg-elevated"
        style={{ "--book-accent": book.accentColor } as React.CSSProperties}
      >
        <FadeImage
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          duration={450}
        />
        {/* Title overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 lg:p-3 w-full">
            <p className="font-cinzel text-[10px] lg:text-[11px] font-semibold text-white leading-snug line-clamp-2">
              {book.title}
            </p>
          </div>
        </div>
        {/* Accent bottom line */}
        <div
          className="absolute bottom-0 inset-x-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          style={{ background: book.accentColor }}
        />
      </Link>
    </motion.div>
  );
}

// ─── View toggle button ───────────────────────────────────────────────────────

function ViewBtn({
  mode,
  current,
  icon,
  label,
  onClick,
}: {
  mode: ViewMode;
  current: ViewMode;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const active = mode === current;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "p-1.5 rounded-sm transition-all duration-200",
        active ? "text-text-primary bg-white/8" : "text-text-muted hover:text-text-secondary"
      )}
    >
      {icon}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BooksPageClient({ books, genres, series }: BooksPageClientProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "Todos" },
    ...genres.map((g) => ({ value: g.slug, label: g.name })),
    { value: "series", label: "Series" },
  ];

  const displayBooks = useMemo(() => {
    let result = filter === "all" || filter === "series"
      ? books
      : books.filter((b) => b.genreSlug === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [books, filter, search]);

  const isSeries = filter === "series" && !search.trim();

  // Clear search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && search) setSearch("");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [search]);

  return (
    <div>
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 lg:mb-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {filters.map(({ value, label }) => {
            const active = filter === value;
            return (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] font-semibold rounded-sm transition-all duration-200"
                style={
                  active
                    ? {
                        background: "rgba(240,237,230,0.1)",
                        color: "#F0EDE6",
                        border: "1px solid rgba(240,237,230,0.18)",
                      }
                    : {
                        background: "transparent",
                        color: "#564F49",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search + view toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div className="relative flex items-center">
            <Search size={13} className="absolute left-2.5 text-text-muted pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-36 sm:w-44 bg-transparent border border-white/[0.08] rounded-sm pl-7 pr-7 py-1.5 text-[11px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/20 transition-colors duration-200"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.12 }}
                  onClick={() => { setSearch(""); searchRef.current?.focus(); }}
                  className="absolute right-2 text-text-muted hover:text-text-secondary transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/[0.08]" />

          {/* View toggles */}
          <div className="flex items-center gap-0.5">
            <ViewBtn mode="grid" current={view} label="Vista grilla" onClick={() => setView("grid")} icon={<LayoutGrid size={15} />} />
            <ViewBtn mode="list" current={view} label="Vista lista" onClick={() => setView("list")} icon={<List size={15} />} />
            <ViewBtn mode="covers" current={view} label="Vista portadas" onClick={() => setView("covers")} icon={<Layers size={15} />} />
          </div>
        </div>
      </div>

      {/* ── Result count ── */}
      {(!isSeries || search) && (
        <p className="text-text-muted text-[10px] uppercase tracking-widest mb-5">
          {displayBooks.length}{" "}
          {search
            ? `resultado${displayBooks.length !== 1 ? "s" : ""}`
            : filter === "all"
            ? "obras"
            : `en esta categoría`}
        </p>
      )}

      {/* ── Series view ── */}
      {isSeries && (
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
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 lg:gap-3">
                  {serieBooks.map((book) => (
                    <CoverTile key={book.id} book={book} index={0} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Book views ── */}
      {!isSeries && (
        <AnimatePresence mode="wait">
          {/* Grid */}
          {view === "grid" && (
            <motion.div
              key={`grid-${filter}-${search}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5"
            >
              {displayBooks.map((book, i) => (
                <BookCard key={book.id} book={book} priority={i < 8} />
              ))}
            </motion.div>
          )}

          {/* List */}
          {view === "list" && (
            <motion.ul
              key={`list-${filter}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {displayBooks.map((book, i) => (
                <BookRow key={book.id} book={book} index={i} />
              ))}
            </motion.ul>
          )}

          {/* Covers */}
          {view === "covers" && (
            <motion.div
              key={`covers-${filter}-${search}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 lg:gap-3"
            >
              {displayBooks.map((book, i) => (
                <CoverTile key={book.id} book={book} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── Empty state ── */}
      {!isSeries && displayBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 flex flex-col items-center gap-3 text-center"
        >
          <p className="font-cinzel text-text-muted text-lg">Sin resultados</p>
          <p className="text-text-muted text-sm">
            No hay libros que coincidan con{" "}
            <span className="text-text-secondary">&ldquo;{search}&rdquo;</span>
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-2 text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-text-primary transition-colors border-b border-white/20 pb-px"
          >
            Limpiar búsqueda
          </button>
        </motion.div>
      )}
    </div>
  );
}
