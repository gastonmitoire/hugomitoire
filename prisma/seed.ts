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
import {
  bookSamples,
  genreSamples,
  userSamples,
} from "./data-samples/dataSamples";

async function createUsersAndProfiles(userSamples: any[]) {
  let createdUsers = [];
  for (const userData of userSamples) {
    const { email, username, passwordHash, role = "USER", profile } = userData;

    // Crear usuario
    const user = await prisma.user.upsert({
      where: { email, username },
      update: {},
      create: { email, username, passwordHash, role },
    });
    console.log("Usuario creado:", user.username);

    // Crear perfil para el usuario
    const userProfile = await prisma.profile.create({
      data: { ...(profile || {}), userId: user.id },
    });
    console.log("Perfil creado para el usuario:", user.username);

    createdUsers.push({ ...user, profile: userProfile });
  }
  return createdUsers;
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

async function createBooksGenresAndChapters(
  bookSamples: any[],
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

  let createdBooks = [];
  // Crear los libros, asignándoles géneros y capítulos correspondientes
  for (const bookData of bookSamples) {
    const { chapters, ...bookInfo } = bookData;

    // Determinar el género del libro
    const genreName = determineGenre(bookData.title);
    const genre = genresByName[genreName];
    if (!genre) {
      throw new Error(
        `No se encontró el género para el libro "${bookData.title}"`
      );
    }
    // Crear el libro y conectarlo al género
    const book = await prisma.book.create({
      data: {
        ...bookInfo,
        genre: { connect: { id: genre.id } },
        illustrator: { connect: { id: illustratorId } },
        publisher: { connect: { id: publisherId } },
      },
      include: {
        genre: true,
      },
    });

    console.log(
      `Libro "${bookInfo.title}" creado con éxito y asignado al género con ID "${genre.id}"`
    );

    // Si el libro tiene capítulos, crearlos
    if (chapters && chapters.length > 0) {
      console.log("CREANDO CHAPTERS");
      try {
        for (const chapterData of chapters) {
          await prisma.chapter.create({
            data: {
              ...chapterData,
              book: { connect: { id: book.id } },
            },
          });
          console.log(
            `Capítulo "${chapterData.title}" creado con éxito para el libro "${bookInfo.title}"`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    createdBooks.push(book);
  }

  return createdBooks;
}

async function main() {
  try {
    // Crear usuarios y perfiles
    const createdUsers = await createUsersAndProfiles(userSamples);
    console.log("Usuarios y perfiles creados con éxito");
    console.log(createdUsers);

    // Obtener los IDs de los usuarios editor e ilustrador
    const illustrator = await prisma.user.findFirst({
      where: { username: "maco" },
    });
    const publisher = await prisma.user.findFirst({
      where: { username: "delapaz" },
    });

    // Crear libros, géneros y capítulos
    const createdBooks = await createBooksGenresAndChapters(
      bookSamples,
      illustrator?.id ?? "valor_predeterminado_illustrator",
      publisher?.id ?? "valor_predeterminado_publisher"
    );
    console.log("Libros, géneros y capítulos creados con éxito");
    console.log(createdBooks);
  } catch (error) {
    console.error(
      "Error al crear usuarios, perfiles, libros, géneros y capítulos:",
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
