import { Book, Chapter, Genre, Serie, Text } from "@prisma/client";
import { textLosOjosDeMariel } from "../texts/textSamples";
import {
  chaptersCuandoEraChico,
  chaptersSerieTerror,
} from "../chapters/chaptersSamples";
export interface BookSamplesProps
  extends Pick<Book, "title" | "description" | "type" | "publicationDate"> {
  chapters?: Array<
    Pick<Chapter, "title" | "order"> & {
      text?: Pick<Text, "title" | "content">[];
    }
  >;
  serieTitle?: string;
}

export const bookSamples: BookSamplesProps[] = [
  {
    title: "Recuerdos de mi muerte",
    description: "Las letanías de un alma en pena",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "Mensajes del mas allá",
    description: "Llamados y señales provenientes del otro plano",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "La Chancha con ruleros",
    description: "Una chancha que queria ser coqueta",
    type: "cuento",
    publicationDate: new Date(),
  },
  {
    title: "Historia de un niño lobo",
    description: "La historia de Eduardo, el lobisón",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "Crispín Soto y El Diablo",
    description: "Un pacto con el demonio",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "Criaturas celestes",
    description: "Encuentro con seres de otro planeta",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "Los Ojos de Mariel",
    description: "Historia sobre un aborto clandestino",
    type: "novela",
    publicationDate: new Date(),
    chapters: [
      {
        title: "Las copas de champagne",
        order: 1,
        text: [
          {
            title: "texto",
            content: textLosOjosDeMariel,
          },
        ],
      },
    ],
  },
  {
    title: "La cacería",
    description: "Relato de una venganza",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "La bestia",
    description: "El anticristo ha nacido",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "Cuentos de terror para Franco I",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["I"],
  },
  {
    title: "Cuentos de terror para Franco II",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["II"],
  },
  {
    title: "Cuentos de terror para Franco III",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["III"],
  },
  {
    title: "Cuentos de terror para Franco IV",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["IV"],
  },
  {
    title: "Cuentos de terror para Franco V",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["V"],
  },
  {
    title: "Cuentos de terror para Franco VI",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["VI"],
  },
  {
    title: "Cuentos de terror para Franco VII",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["VII"],
  },
  {
    title: "Cuentos de terror para Franco VIII",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
    chapters: chaptersSerieTerror["VIII"],
  },
  {
    title: "Cuentos de terror para Franco IX",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuando era chico I",
    description: "Relatos e historias de la infancia",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuando era chico",
    chapters: chaptersCuandoEraChico["Volumen1"],
  },
  {
    title: "Cuando era chico II",
    description: "Relatos e historias de la infancia",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuando era chico",
    chapters: chaptersCuandoEraChico["Volumen2"],
  },
];
