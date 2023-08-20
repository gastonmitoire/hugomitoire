import { fetchClient } from "@/app/_utils";
import { Book as BookModel } from "@prisma/client";

export const booksService = {
  getAll,
  getById,
};

async function getAll() {
  const books = await fetchClient("/books", { method: "GET", headers: {} });

  return books as BookModel[];
}

async function getById(id: string) {
  const book = await fetchClient(`/books/${id}`, {
    method: "GET",
    headers: {},
  });

  return book as BookModel;
}
