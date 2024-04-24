import { Book, Chapter, Genre, Serie } from "@prisma/client";

const userSamples = [
  {
    email: "gastonmm@gmail.com",
    username: "gastoire",
    passwordHash: "1234",
    role: "ADMIN",
    profile: {
      displayName: "gastoire",
      bio: "Escribe una bio interesante.",
      dateOfBirth: new Date("12-12-1924"),
      firstName: "Gastón",
      lastName: "Mitoire",
      image: "/images/gastoire_profile.png",
    },
  },
  {
    email: "elmaco0381@gmail.com",
    username: "maco",
    passwordHash: "1234",
    role: "ILLUSTRATOR",
    profile: {
      displayName: "Maco",
      bio: "Escribe una bio interesante.",
      dateOfBirth: new Date("12-12-1924"),
      firstName: "Maco",
      lastName: "Pacheco",
      image: "/images/maco_profile.png",
    },
  },
  {
    email: "edicionesdelapaz@gmail.com",
    username: "delapaz",
    passwordHash: "1234",
    role: "PUBLISHER",
    profile: {
      displayName: "Librería de la Paz",
      bio: "Escribe una bio interesante.",
      dateOfBirth: new Date("12-12-1924"),
      firstName: "Librería",
      lastName: "de la Paz",
      image: "/images/de-la-paz_profile.png",
    },
  },
];

export interface BookSamplesProps
  extends Pick<Book, "title" | "description" | "type" | "publicationDate"> {
  chapters?: Pick<Chapter, "title" | "order">[];
  serieTitle?: string;
}

const bookSamples: BookSamplesProps[] = [
  {
    title: "Los Ojos de Mariel",
    description: "Historia sobre un aborto clandestino",
    type: "novela",
    publicationDate: new Date(),
    chapters: [
      {
        title: "Las copas de champagne",
        order: 1,
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
  },
  {
    title: "Cuentos de terror para Franco II",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuentos de terror para Franco III",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuentos de terror para Franco IV",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuentos de terror para Franco V",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuentos de terror para Franco VI",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuentos de terror para Franco VII",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
  },
  {
    title: "Cuentos de terror para Franco VIII",
    description: "Cuentos de terror, aventura y misterio",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuentos de terror para Franco",
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
  },
  {
    title: "Cuando era chico II",
    description: "Relatos e historias de la infancia",
    type: "cuento",
    publicationDate: new Date(),
    serieTitle: "Cuando era chico",
  },
];

const genreSamples: Pick<Genre, "name" | "ageRange">[] = [
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

export { bookSamples, genreSamples, userSamples };
