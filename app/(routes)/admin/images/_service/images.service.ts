import { fetchClient } from "@/app/_utils";
import { Image as ImageModel } from "@prisma/client";

export const imagesService = {
  getAll,
};

async function getAll() {
  const images = await fetchClient("/images", { method: "GET", headers: {} });

  return images as ImageModel[];
}
