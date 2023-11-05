import React from "react";

import { BookForm } from "./BookForm.component";

import { imagesService } from "@/app/_images/_service/images.service";
import { usersService } from "@/app/_users/_service/users.service";

export const BookFormWrapper: React.FC = async () => {
  const images = await imagesService.getAll();
  const users = await usersService.getAll();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return <BookForm images={images} genres={[]} users={users} />;
};
