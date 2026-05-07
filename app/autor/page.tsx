import { Metadata } from "next";
import { author } from "@/data/author";
import { Footer } from "@/components/layout/Footer";
import { AuthorHero } from "@/components/author/AuthorHero";
import { AuthorQuote } from "@/components/author/AuthorQuote";
import { AuthorBio } from "@/components/author/AuthorBio";
import { AuthorStats } from "@/components/author/AuthorStats";
import { AuthorAwards } from "@/components/author/AuthorAwards";
import { AuthorGallery } from "@/components/author/AuthorGallery";
import { AuthorNav } from "@/components/author/AuthorNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Autor",
  description:
    "Hugo Mitoire — escritor argentino de literatura infantil, juvenil y policial negro. Resistencia, Chaco.",
};

export default function AutorPage() {
  return (
    <>
      <AuthorNav />
      <main>
        <div id="autor-hero">
          <AuthorHero author={author} />
        </div>

        <div id="autor-pensamiento">
          <AuthorQuote author={author} />
        </div>

        <AuthorGallery />

        <div id="autor-bio">
          <AuthorBio author={author} />
        </div>

        <div id="autor-numeros">
          <AuthorStats author={author} />
        </div>

        <div id="autor-trayectoria">
          <AuthorAwards author={author} />
        </div>

        {/* CTA */}
        <section className="py-20 lg:py-28 border-t border-white/[0.06]">
          <div className="mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12 text-center flex flex-col items-center gap-5">
            <div className="w-10 h-px bg-white/20" />
            <p className="font-bellefair text-xl text-text-secondary max-w-sm leading-relaxed">
              Veinte años de historias, del monte chaqueño al policial negro.
            </p>
            <Link
              href="/libros"
              className="mt-2 inline-flex items-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-text-primary text-base transition-opacity hover:opacity-85"
            >
              Ver todas las obras
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
