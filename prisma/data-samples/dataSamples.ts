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

const bookSamples = [
  {
    title: "Los Ojos de Mariel",
    slug: "los-ojos-de-mariel",
    description: "Historia sobre un aborto clandestino",
    cover: "/portadas/los-ojos-de-mariel.jpg",
    secondaryImage: "/imagenes/los-ojos-de-mariel_BG.jpg",
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
    slug: "la-caceria",
    description: "Relato de una venganza",
    cover: "/portadas/la-caceria.jpg",
    secondaryImage: "/imagenes/la-caceria_BG.jpg",
    type: "novela",
    publicationDate: new Date(),
  },
  {
    title: "La bestia",
    slug: "la-bestia",
    description: "El anticristo ha nacido",
    cover: "/portadas/la-bestia.jpg",
    secondaryImage: "/imagenes/la-bestia_BG.jpg",
    type: "novela",
    publicationDate: new Date(),
  },
];

const genreSamples = [
  {
    name: "Negro",
    slug: "negro",
    ageRange: "16",
  },
  {
    name: "Terror y misterio",
    slug: "terror-y-misterio",
    ageRange: "10",
  },
];

export { bookSamples, genreSamples, userSamples };
