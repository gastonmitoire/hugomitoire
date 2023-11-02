import React from "react";

import { BookGrid } from "./BookGrid.component";

import { booksService } from "../_service/books.service";

export const BookGridWrapper: React.FC = async () => {
  const books = await booksService.getAll();

  return <BookGrid books={[...books, ...books, ...books, ...books]} />;
};
