import { books, getFeaturedBook } from "@/data/books";
import { series } from "@/data/series";
import { BookHero } from "@/components/books/BookHero";
import { BooksGrid } from "@/components/books/BooksGrid";
import { SeriesShowcase } from "@/components/books/SeriesShowcase";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedBook();
  const standaloneBooks = books.filter((b) => !b.serieSlug);
  const terrorSerie = series.find((s) => s.slug === "cuentos-de-terror-para-franco")!;

  return (
    <>
      <main>
        <BookHero book={featured} />

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
            <BooksGrid books={standaloneBooks} title="Obras" />
          </div>
        </section>

        <SeriesShowcase serie={terrorSerie} />

        {/* Author teaser */}
        <section className="py-20 lg:py-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
            <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-5">
              <div className="w-10 h-px bg-white/20" />
              <blockquote className="font-bellefair text-2xl lg:text-3xl text-text-secondary leading-relaxed italic">
                &ldquo;Contar historias es el único conjuro que conozco contra el olvido.&rdquo;
              </blockquote>
              <p className="text-text-muted text-[10px] uppercase tracking-[0.2em]">
                Hugo Mitoire
              </p>
              <Link
                href="/autor"
                className="mt-1 text-[11px] uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors border-b border-white/20 hover:border-white/50 pb-px"
              >
                Conocer al autor →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
