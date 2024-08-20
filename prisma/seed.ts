import { PrismaClient, Book, Genre, Serie } from "@prisma/client";
const prisma = new PrismaClient();

import {
  bookSamples,
  BookSamplesProps,
  genreSamples,
  GenreSamplesProps,
  userSamples,
  UserSamplesProps,
} from "./data-samples";

const generateSlug = (title: string) => {
  const withoutNWithAccent = title.replace(/Ñ/gi, "n");
  const withoutAccent = withoutNWithAccent
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return withoutAccent
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
};

async function createUsersAndProfiles(userSamples: UserSamplesProps[]) {
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

function determineGenre(bookTitle: Book["title"]): string {
  // Lógica para determinar el género basado en el título del libro
  if (
    bookTitle.includes("Ojos de Mariel") ||
    bookTitle.includes("La cacería")
  ) {
    return "Negro";
  } else if (bookTitle.includes("La Chancha con ruleros")) {
    return "Curiosa Vida Animal";
  } else if (
    bookTitle.includes("Criaturas celestes") ||
    bookTitle.includes("Crispín Soto y El Diablo") ||
    bookTitle.includes("La bestia") ||
    bookTitle.includes("Mensajes del mas allá") ||
    bookTitle.includes("Historia de un niño lobo") ||
    bookTitle.includes("Recuerdos de mi muerte")
  ) {
    return "Fantástico y Ciencia Ficción";
  } else if (bookTitle.includes("Cuentos de terror")) {
    return "Terror";
  } else if (bookTitle.includes("Cuando era")) {
    return "Cuando era chico";
  } else {
    // En caso de que no haya un género específico asignado
    return "Otro";
  }
}

async function createBooksGenresAndChapters(bookSamples: BookSamplesProps[]) {
  // Crear los géneros si no existen
  await Promise.all(
    genreSamples.map(async (genreData: GenreSamplesProps) => {
      const existingGenre = await prisma.genre.findFirst({
        where: { name: genreData.name },
      });
      if (!existingGenre) {
        await prisma.genre.create({
          data: {
            ...genreData,
            slug: generateSlug(genreData.name),
          },
        });
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

  // Obtener los IDs de los usuarios editor e ilustrador
  const illustrator = await prisma.user.findFirst({
    where: { username: "maco" },
  });
  const publisher = await prisma.user.findFirst({
    where: { username: "delapaz" },
  });

  // Crear los libros, asignándoles géneros y capítulos correspondientes
  let createdBooks = [];
  for (const bookData of bookSamples) {
    const { chapters, serieTitle, ...bookInfo } = bookData;
    const generatedSlug = generateSlug(bookInfo.title);
    const imagesFolderPath = "/assets/images";

    // Determinar el género del libro
    const genreName = determineGenre(bookData.title);
    const genre = genresByName[genreName];
    if (!genre) {
      throw new Error(
        `No se encontró el género para el libro "${bookData.title}"`
      );
    }

    let newBookData = {
      ...bookInfo,
      slug: generatedSlug,
      cover: imagesFolderPath + "/covers/" + generatedSlug + "_COVER.png",
      secondaryImage: imagesFolderPath + "/bg/" + generatedSlug + "_BG.png",
      genre: { connect: { id: genre.id } },
      illustrator: { connect: { id: illustrator?.id } },
      publisher: { connect: { id: publisher?.id } },
    };

    if (serieTitle) {
      let serie: Serie | null = await prisma.serie.findFirst({
        where: { title: serieTitle },
      });

      if (!serie) {
        serie = await prisma.serie.create({
          data: {
            title: serieTitle,
            description: bookInfo.description,
            slug: generateSlug(serieTitle),
          },
        });
        console.log(`Serie "${serieTitle}" creada con éxito`);

        Object.assign(newBookData, {
          serie: { connect: { id: serie.id } },
        });
      }
    }

    // Crear el libro y conectarlo al género
    const book = await prisma.book.create({
      data: newBookData,
    });

    console.log(
      `Libro "${bookInfo.title}" creado con éxito y asignado al género con ID "${genre.id}"`
    );

    // Si el libro tiene capítulos, crearlos
    if (chapters && chapters.length > 0) {
      console.log("CREANDO CHAPTERS");
      try {
        for (const chapterData of chapters) {
          // Crear el capítulo
          const createdChapter = await prisma.chapter.create({
            data: {
              title: chapterData.title,
              order: chapterData.order,
              book: { connect: { id: book.id } },
            },
          });

          console.log(
            `Capítulo "${chapterData.title}" creado con éxito para el libro "${bookInfo.title}"`
          );

          // Si el capítulo tiene texto, crearlo y vincularlo al capítulo
          if (chapterData.text && chapterData.text.length > 0) {
            for (const textData of chapterData.text) {
              await prisma.text.create({
                data: {
                  title: textData.title,
                  content: textData.content,
                  chapter: { connect: { id: createdChapter.id } },
                },
              });
              console.log(
                `Texto "${textData.title}" creado y vinculado al capítulo "${chapterData.title}"`
              );
            }
          }
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

    // Crear libros, géneros y capítulos
    const createdBooks = await createBooksGenresAndChapters(bookSamples);
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
