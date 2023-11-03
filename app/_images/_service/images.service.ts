import { fetchClient } from "@/app/_utils";
import { Image as ImageModel } from "@prisma/client";

export const imagesService = {
  getAll,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const images = await fetchClient("/images", { method: "GET", headers: {} });

  return images as ImageModel[];
}

async function create(image: ImageModel) {
  const response = await fetchClient("/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });

  return response as ImageModel;
}

async function update(image: ImageModel) {
  const response = await fetchClient(`/images/${image.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
  });

  return response as ImageModel;
}

async function _delete(id: number) {
  const response = await fetchClient(`/images/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return response as ImageModel;
}
