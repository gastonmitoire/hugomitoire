import { SerieData } from "./types";

export const series: SerieData[] = [
  {
    slug: "cuentos-de-terror-para-franco",
    title: "Cuentos de Terror para Franco",
    description:
      "Una colección de nueve tomos de cuentos de terror, aventura y misterio ambientados en el Chaco argentino. Leyendas, aparecidos, criaturas del monte y sucesos inexplicables narrados con la voz de quien los vivió.",
    bookSlugs: [
      "cuentos-de-terror-para-franco-i",
      "cuentos-de-terror-para-franco-ii",
      "cuentos-de-terror-para-franco-iii",
      "cuentos-de-terror-para-franco-iv",
      "cuentos-de-terror-para-franco-v",
      "cuentos-de-terror-para-franco-vi",
      "cuentos-de-terror-para-franco-vii",
      "cuentos-de-terror-para-franco-viii",
      "cuentos-de-terror-para-franco-ix",
    ],
  },
  {
    slug: "cuando-era-chico",
    title: "Cuando Era Chico",
    description:
      "Dos volúmenes de memorias que recuperan el mundo de un niño chaqueño con humor, ternura y una mirada única sobre la infancia en el interior argentino.",
    bookSlugs: ["cuando-era-chico-i", "cuando-era-chico-ii"],
  },
];

export function getSerieBySlug(slug: string): SerieData | undefined {
  return series.find((s) => s.slug === slug);
}
