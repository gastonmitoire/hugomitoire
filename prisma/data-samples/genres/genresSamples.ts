import { Book, Chapter, Genre, Serie } from "@prisma/client";

export type GenreSamplesProps = Pick<Genre, "name" | "ageRange">;

export const genreSamples: GenreSamplesProps[] = [
  {
    name: "Curiosa Vida Animal",
    ageRange: "5",
  },
  {
    name: "Negro",
    ageRange: "16",
  },
  {
    name: "Terror",
    ageRange: "10",
  },
  {
    name: "Fantástico y Ciencia Ficción",
    ageRange: "10",
  },
  {
    name: "Cuando era chico",
    ageRange: "8",
  },
];
