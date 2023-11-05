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
  create,
  update,
  delete: _delete,
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

async function create(book: Omit<BookModel, "id" | "slug">) {
  const response = await fetchClient("/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  return response as EnhancedBookModel;
}

async function update(book: BookModel) {
  const response = await fetchClient(`/books/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  return response as EnhancedBookModel;
}

async function _delete(id: string) {
  const response = await fetchClient(`/books/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return response as EnhancedBookModel;
}
