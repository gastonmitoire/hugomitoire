import { fetchClient } from "@/app/_utils";
import { Book as BookModel } from "@prisma/client";
import { Genre as GenreModel } from "@prisma/client";
import { User as UserModel } from "@prisma/client";

export interface EnhancedBookModel extends BookModel {
  genre: Pick<GenreModel, "name" | "ageRange">;
  illustrator: Pick<UserModel, "username">;
  publisher: Pick<UserModel, "username">;
}

export const booksService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const books = await fetchClient("/books", { method: "GET", headers: {} });

  return books as EnhancedBookModel[];
}

async function getById(id: string) {
  const book = await fetchClient(`/books/${id}`, {
    method: "GET",
    headers: {},
  });

  console.log(book);

  return book as EnhancedBookModel;
}

async function create(params: any) {
  const book = await fetchClient("/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return book as EnhancedBookModel;
}

async function update(id: string, params: any) {
  const book = await fetchClient(`/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return book as EnhancedBookModel;
}

async function _delete(id: string) {
  const book = await fetchClient(`/books/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return book as EnhancedBookModel;
}
