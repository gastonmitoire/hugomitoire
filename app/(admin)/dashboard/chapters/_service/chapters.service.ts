import { fetchClient } from "@/app/_utils";
import { Chapter as ChapterModel } from "@prisma/client";

export const chaptersService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const chapters = await fetchClient("/chapters", {
    method: "GET",
    headers: {},
  });

  return chapters as ChapterModel[];
}

async function getById(id: string) {
  const chapter = await fetchClient(`/chapters/${id}`, {
    method: "GET",
    headers: {},
  });

  return chapter as ChapterModel;
}

async function create(params: any) {
  const chapter = await fetchClient("/chapters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return chapter as ChapterModel;
}

async function update(id: string, params: any) {
  const chapter = await fetchClient(`/chapters/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  return chapter as ChapterModel;
}

async function _delete(id: string) {
  const chapter = await fetchClient(`/chapters/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return chapter as ChapterModel;
}
