import React from "react";
import { BooksSwiper } from "./BooksSwiper";
import { booksService } from "../_service/books.service";

export const BooksSwiperWrapper = async () => {
  const books = (await booksService.getAll()).filter((i) =>
    i.slug.startsWith("cuentos-de-terror")
  );
  return <BooksSwiper books={books} />;
};
