import { Profile, User } from "@prisma/client";

export interface UserSamplesProps
  extends Pick<User, "email" | "username" | "passwordHash" | "role"> {
  profile: Pick<
    Profile,
    "displayName" | "bio" | "dateOfBirth" | "firstName" | "lastName" | "image"
  >;
}

export const userSamples: UserSamplesProps[] = [
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
