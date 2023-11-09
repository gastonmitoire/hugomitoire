import { fetchClient } from "@/app/_utils";
import { Genre as GenreModel } from "@prisma/client";

export const genresService = {
  getAll,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const genres = await fetchClient("/genres", { method: "GET", headers: {} });

  return genres as GenreModel[];
}

async function create(genre: Omit<GenreModel, "id" | "slug">) {
  const response = await fetchClient("/genres", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });

  return response as GenreModel;
}

async function update(genre: GenreModel) {
  const response = await fetchClient(`/genres/${genre.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genre),
  });

  return response as GenreModel;
}

async function _delete(id: string) {
  const response = await fetchClient(`/genres/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return response as GenreModel;
}
