import React from "react";

import { BookForm } from "./BookForm.component";

import { imagesService } from "@/app/_images/_service/images.service";

export const BookFormWrapper: React.FC = async () => {
  const images = await imagesService.getAll();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return <BookForm images={images} genres={[]} users={[]} />;
};
