import { fetchClient } from "@/app/_utils";
import { Genre as GenreModel } from "@prisma/client";

export const genresService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

//   fetchClient([url], {method: 'GET', headers: {}})});

async function getAll() {
  const genres = await fetchClient("/genres", { method: "GET", headers: {} });

  return genres as GenreModel[];
}

async function getById(id: number) {
  const genre = await fetchClient(`/genres/${id}`, {
    method: "GET",
    headers: {},
  });

  return genre as GenreModel;
}

async function create(params: any) {
  const genre = await fetchClient("/genres", {
    method: "POST",
    headers: {},
    body: JSON.stringify(params),
  });

  return genre as GenreModel;
}

async function update(id: number, params: any) {
  const genre = await fetchClient(`/genres/${id}`, {
    method: "PUT",
    headers: {},
    body: JSON.stringify(params),
  });

  return genre as GenreModel;
}

async function _delete(id: number) {
  const genre = await fetchClient(`/genres/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return genre as GenreModel;
}
