import { Metadata } from "next";
import { books } from "@/data/books";
import { genres } from "@/data/genres";
import { series } from "@/data/series";
import { BooksPageClient } from "@/components/books/BooksPageClient";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Libros",
  description:
    "Todas las obras de Hugo Mitoire — novelas, cuentos y series. Cuentos de Terror para Franco, Los Ojos de Mariel, La Cacería y más.",
  alternates: { canonical: "/libros" },
  openGraph: {
    title: "Libros | Hugo Mitoire",
    description:
      "Catálogo completo de obras de Hugo Mitoire — novelas, cuentos y series.",
    type: "website",
    url: "/libros",
  },
};

export default function LibrosPage() {
  return (
    <>
      <main className="min-h-screen pt-20 lg:pt-28">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="mb-12 lg:mb-16">
            <p className="text-text-muted text-[10px] uppercase tracking-[0.22em] mb-2">
              Hugo Mitoire
            </p>
            <h1 className="font-cinzel text-4xl lg:text-6xl font-bold text-white tracking-wide">
              Obras
            </h1>
            <p className="mt-3 text-text-secondary font-bellefair text-lg max-w-lg">
              {books.length} obras publicadas — novelas, cuentos e historias del interior argentino.
            </p>
            <div className="mt-5 h-px w-20 bg-white/20" />
          </div>
          <BooksPageClient books={books} genres={genres} series={series} />
        </div>
      </main>
      <Footer />
    </>
  );
}
