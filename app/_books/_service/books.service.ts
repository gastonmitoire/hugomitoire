import { fetchClient } from "@/app/_utils";
import { Book as BookModel } from "@prisma/client";
import { Chapter as ChapterModel } from "@prisma/client";
import { Genre as GenreModel } from "@prisma/client";
import { User as UserModel } from "@prisma/client";

export type EnhancedChapter = ChapterModel & {
  text: string[];
};

export interface EnhancedBookModel extends BookModel {
  genre: Pick<GenreModel, "name" | "ageRange">;
  illustrator: Pick<UserModel, "username">;
  publisher: Pick<UserModel, "username">;
  chapters: EnhancedChapter[];
}

export const booksService = {
  getAll,
  getBySlug,
};

async function getAll() {
  const books = await fetchClient("/books", { method: "GET", headers: {} });

  return books as EnhancedBookModel[];
}

async function getBySlug(slug: string) {
  const book = await fetchClient(`/books/${slug}`, {
    method: "GET",
    headers: {},
  });

  return book as EnhancedBookModel;
}
