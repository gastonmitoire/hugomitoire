import React from "react";

import { imagesService } from "@/app/_images/_service/images.service";

import { AdminImages } from "./AdminImages";

export const AdminImagesWrapper: React.FC = async () => {
  const images = await imagesService.getAll();

  return <AdminImages images={images} />;
};
