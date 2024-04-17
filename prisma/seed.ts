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
      image: "/images/gastoire-profile.png",
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
      image: "/images/maco-profile.png",
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
    genreId: "string",
    illustratorId: "string",
    publisherId: "string",
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

async function main() {
  try {
    const data = await createUsersWithProfiles();
    console.log("Usuarios y perfiles creados con éxito");
    console.log(data);
  } catch (error) {
    console.error("Error al crear usuarios y perfiles:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (error) => {
  console.error("Error inesperado:", error);
  await prisma.$disconnect();
  process.exit(1);
});
