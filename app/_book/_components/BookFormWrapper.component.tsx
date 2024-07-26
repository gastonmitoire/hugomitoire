import React from "react";

import { BookForm } from "./BookForm.component";

import { genresService } from "../../_genre/_service/genres.service";
import { imagesService } from "../../_image/_service/images.service";
import { usersService } from "../../_user/_service/users.service";

export const BookFormWrapper: React.FC = async () => {
  const genres = await genresService.getAll();
  const images = await imagesService.getAll();
  const users = await usersService.getAll();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return <BookForm images={images} genres={genres} users={users} />;
};
