import React from "react";

import { BookGrid } from "./BookGrid.component";

import { booksService } from "../_service/books.service";

export const BookGridWrapper: React.FC = async () => {
  const books = await booksService.getAll();

  const isLoaded = books.length > 0;

  return isLoaded ? <BookGrid books={books} /> : null;
};
