import React from "react";

import { imagesService } from "../../_image/_service/images.service";

import { AdminImages } from "./AdminImages.component";

export const AdminImagesWrapper: React.FC = async () => {
  const images = await imagesService.getAll();

  return <AdminImages images={images} />;
};
