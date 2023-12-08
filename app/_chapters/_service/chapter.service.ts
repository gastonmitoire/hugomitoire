import { fetchClient } from "@/app/_utils";
import { Chapter as ChapterModel } from "@prisma/client";

export type EnhancedChapterModel = ChapterModel & {
  text: string[];
};

export const chapterService = {
  getAll,
  getByQueryParam,
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

  return chapters as EnhancedChapterModel[];
}

async function getByQueryParam({ key, value }: { key: string; value: string }) {
  const searchParams = new URLSearchParams({ key, value });

  console.log(searchParams);

  // const chapters = await fetchClient(`/chapters?bookSlug=${slug}`, {
  //   method: "GET",
  //   headers: {},
  // });

  // return chapters as EnhancedChapterModel[];
}

async function getById(id: string) {
  const chapter = await fetchClient(`/chapters/${id}`, {
    method: "GET",
    headers: {},
  });

  return chapter as EnhancedChapterModel;
}

async function create(chapter: Omit<ChapterModel, "id">) {
  const response = await fetchClient("/chapters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chapter),
  });

  return response as EnhancedChapterModel;
}

async function update(chapter: ChapterModel) {
  const response = await fetchClient(`/chapters/${chapter.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chapter),
  });

  return response as EnhancedChapterModel;
}

async function _delete(id: string) {
  const response = await fetchClient(`/chapters/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return response as EnhancedChapterModel;
}
