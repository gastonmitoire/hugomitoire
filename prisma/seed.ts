import {
  PrismaClient,
  User,
  Book,
  Genre,
  Chapter,
  Profile,
  UserSettings,
} from "@prisma/client";
const prisma = new PrismaClient();

async function createUser(
  email: string,
  username: string,
  passwordHash: string
): Promise<User> {
  return await prisma.user.upsert({
    where: { email, username },
    update: {},
    create: { email, username, passwordHash },
  });
}

async function createGenre(newGenre: Omit<Genre, "id">): Promise<Genre> {
  return await prisma.genre.create({
    data: newGenre,
  });
}

async function createBook(newBook: Omit<Book, "id">): Promise<Book> {
  return await prisma.book.create({
    data: newBook,
  });
}

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

async function createUserWithProfile(
  email: string,
  username: string,
  passwordHash: string,
  role: string,
  profileData: Omit<Profile, "id" | "userId">
): Promise<{ user: User; profile: Profile }> {
  const user = await createUser(email, username, passwordHash);
  console.log("Usuario creado:", user.username);

  const userProfile = await prisma.profile.create({
    data: { ...profileData, userId: user.id },
  });
  console.log("Perfil creado para el usuario:", user.username);

  return { user, profile: userProfile };
}

async function createUsersWithProfiles() {
  let createdUsers = [];
  for (const userData of userSamples) {
    const { user, profile } = await createUserWithProfile(
      userData.email,
      userData.username,
      userData.passwordHash,
      userData.role || "USER",
      userData.profile
    );

    console.log("Perfil creado para el usuario:", user.username);
    createdUsers.push({ ...user, profile });
  }
  return createdUsers;
}

async function createBooksAndGenres(
  illustratorId: string,
  publisherId: string
) {
  // Crear los géneros si no existen
  await Promise.all(
    genreSamples.map(async (genreData) => {
      const existingGenre = await prisma.genre.findFirst({
        where: { name: genreData.name },
      });
      if (!existingGenre) {
        await prisma.genre.create({ data: genreData });
      }
    })
  );

  // Mapear los géneros creados a un objeto que pueda ser buscado rápidamente por nombre
  const createdGenres = await prisma.genre.findMany();
  interface GenreMap {
    [key: string]: Genre;
  }
  const genresByName = createdGenres.reduce((acc: GenreMap, genre) => {
    acc[genre.name] = genre;
    return acc;
  }, {});

  // Crear los libros asignándoles los géneros correspondientes
  for (const bookData of bookSamples) {
    const genreName = determineGenre(bookData.title);
    const genre = genresByName[genreName];
    if (!genre) {
      throw new Error(
        `No se encontró el género para el libro "${bookData.title}"`
      );
    }
    await createBookWithGenre(bookData, genre.id, illustratorId, publisherId);
  }
}

async function createBookWithGenre(
  bookData: any,
  genreId: string,
  illustratorId: string,
  publisherId: string
) {
  const book = await prisma.book.create({
    data: {
      ...bookData,
      genre: { connect: { id: genreId } },
      illustrator: { connect: { id: illustratorId } },
      publisher: { connect: { id: publisherId } },
    },
  });
  console.log(
    `Libro "${bookData.title}" creado con éxito y asignado al género con ID "${genreId}"`
  );
}

function determineGenre(bookTitle: string): string {
  // Lógica para determinar el género basado en el título del libro
  if (
    bookTitle.includes("Ojos de Mariel") ||
    bookTitle.includes("La cacería")
  ) {
    return "Negro";
  } else if (bookTitle.includes("La bestia")) {
    return "Terror y misterio";
  } else {
    // En caso de que no haya un género específico asignado
    return "Otro";
  }
}

async function main() {
  try {
    // Crear usuarios y perfiles
    const userData = await createUsersWithProfiles();
    console.log("Usuarios y perfiles creados con éxito");
    console.log(userData);

    // Obtener los IDs de los usuarios editor e ilustrador
    const illustrator = await prisma.user.findFirst({
      where: { username: "maco" }, // Cambia a la forma en que identificas a los usuarios ilustrador
    });
    const publisher = await prisma.user.findFirst({
      where: { username: "delapaz" }, // Cambia a la forma en que identificas a los usuarios editor
    });

    // Crear libros y géneros
    const genresByName = await createBooksAndGenres(
      illustrator?.id ?? "valor_predeterminado_illustrator",
      publisher?.id ?? "valor_predeterminado_publisher"
    );
    console.log("Libros y géneros creados con éxito");
    console.log(genresByName);
  } catch (error) {
    console.error(
      "Error al crear usuarios, perfiles, libros y géneros:",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (error) => {
  console.error("Error inesperado:", error);
  await prisma.$disconnect();
  process.exit(1);
});
