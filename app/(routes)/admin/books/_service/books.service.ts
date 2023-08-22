import { fetchClient } from "@/app/_utils";
import { Book as BookModel } from "@prisma/client";

export const booksService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
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

async function create(params: any) {
  const book = await fetchClient("/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return book as BookModel;
}

async function update(id: string, params: any) {
  const book = await fetchClient(`/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return book as BookModel;
}

async function _delete(id: string) {
  await fetchClient(`/books/${id}`, { method: "DELETE", headers: {} });
}
