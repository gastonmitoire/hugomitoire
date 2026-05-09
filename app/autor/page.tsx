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
import { AuthorCTA } from "@/components/author/AuthorCTA";

export const metadata: Metadata = {
  title: "Autor",
  description:
    "Conocé a Hugo Mitoire, escritor argentino nacido en Margarita Belén, Chaco. Más de 20 obras publicadas de literatura infantil, juvenil y policial negro.",
  alternates: { canonical: "/autor" },
  openGraph: {
    title: "Hugo Mitoire — Autor",
    description:
      "Escritor argentino nacido en Margarita Belén, Chaco. Más de 20 obras de literatura infantil, juvenil y policial negro.",
    type: "profile",
    url: "/autor",
  },
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

        <AuthorCTA />
      </main>
      <Footer />
    </>
  );
}
