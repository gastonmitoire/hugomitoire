import { GenreData } from "./types";

export const genres: GenreData[] = [
  { slug: "curiosa-vida-animal", name: "Curiosa Vida Animal", ageRange: "5" },
  { slug: "negro", name: "Negro", ageRange: "16" },
  { slug: "terror", name: "Terror", ageRange: "10" },
  {
    slug: "fantastico-y-ciencia-ficcion",
    name: "Fantástico y Ciencia Ficción",
    ageRange: "10",
  },
  { slug: "cuando-era-chico", name: "Cuando Era Chico", ageRange: "8" },
];

export function getGenreBySlug(slug: string): GenreData | undefined {
  return genres.find((g) => g.slug === slug);
}
