import { Book, Chapter, Genre, Serie } from "@prisma/client";

export type GenreSamplesProps = Pick<Genre, "name" | "ageRange">;

export const genreSamples: GenreSamplesProps[] = [
  {
    name: "Negro",
    ageRange: "16",
  },
  {
    name: "Terror",
    ageRange: "10",
  },
  {
    name: "Novelas Fantásticas y Ciencia Ficción",
    ageRange: "10",
  },
  {
    name: "Cuando era chico",
    ageRange: "8",
  },
];
