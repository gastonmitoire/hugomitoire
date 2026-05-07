import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { books, getBookBySlug, getBooksBySerie } from "@/data/books";
import { getGenreBySlug } from "@/data/genres";
import { getSerieBySlug } from "@/data/series";
import { Footer } from "@/components/layout/Footer";
import { ChapterList } from "@/components/chapters/ChapterList";
import { BookDetailHero } from "@/components/books/BookDetailHero";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const genre = getGenreBySlug(book.genreSlug);
  const serie = book.serieSlug ? getSerieBySlug(book.serieSlug) : undefined;
  const serieBooks = book.serieSlug ? getBooksBySerie(book.serieSlug) : [];
  const currentIndex = serieBooks.findIndex((b) => b.slug === book.slug);
  const prevBook = currentIndex > 0 ? serieBooks[currentIndex - 1] : null;
  const nextBook = currentIndex < serieBooks.length - 1 ? serieBooks[currentIndex + 1] : null;

  return (
    <>
      <main style={{ "--book-accent": book.accentColor } as React.CSSProperties}>
        <BookDetailHero
          book={book}
          genre={genre}
          serie={serie}
          serieOrder={book.serieOrder}
          serieTotalBooks={serieBooks.length || undefined}
        />

        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 py-16 lg:py-24 flex flex-col gap-16 lg:gap-24">
          {/* Chapters */}
          {book.chapters.length > 0 && (
            <section className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-3">
                Contenido
              </p>
              <h2 className="font-cinzel text-2xl lg:text-3xl font-bold text-white mb-8 tracking-wide">
                Índice
              </h2>
              <ChapterList
                bookTitle={book.title}
                chapters={book.chapters}
                accentColor={book.accentColor}
              />
            </section>
          )}

          {/* Series navigation */}
          {serie && (prevBook || nextBook) && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted mb-3">
                Serie
              </p>
              <h2 className="font-cinzel text-2xl lg:text-3xl font-bold text-white mb-8 tracking-wide">
                {serie.title}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {prevBook && (
                  <Link
                    href={`/libros/${prevBook.slug}`}
                    className="group flex items-center gap-4 p-4 bg-surface border border-border hover:border-white/15 rounded-sm transition-colors flex-1"
                  >
                    <ChevronLeft size={14} className="text-text-muted shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                    <div className="relative w-10 h-14 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={prevBook.cover}
                        alt={prevBook.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[9px] uppercase tracking-[0.16em] mb-0.5"
                        style={{ color: prevBook.accentColor }}
                      >
                        Tomo {prevBook.serieOrder}
                      </p>
                      <p className="font-cinzel text-[13px] text-text-primary font-semibold leading-snug line-clamp-2">
                        {prevBook.title}
                      </p>
                    </div>
                  </Link>
                )}

                {nextBook && (
                  <Link
                    href={`/libros/${nextBook.slug}`}
                    className="group flex items-center gap-4 p-4 bg-surface border border-border hover:border-white/15 rounded-sm transition-colors flex-1 sm:flex-row-reverse text-right"
                  >
                    <ChevronRight size={14} className="text-text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <div className="relative w-10 h-14 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={nextBook.cover}
                        alt={nextBook.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[9px] uppercase tracking-[0.16em] mb-0.5"
                        style={{ color: nextBook.accentColor }}
                      >
                        Tomo {nextBook.serieOrder}
                      </p>
                      <p className="font-cinzel text-[13px] text-text-primary font-semibold leading-snug line-clamp-2">
                        {nextBook.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
