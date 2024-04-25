import React from "react";

import { Skeleton } from "@nextui-org/skeleton";

import { BookGrid } from "./BookGrid.component";

import { EnhancedBookModel } from "../_service/books.service";

import { booksService } from "../_service/books.service";

export const BookGridWrapper: React.FC = async () => {
  const selectedSlugs = [
    "criaturas-celestes",
    "crispin-soto-y-el-diablo",
    "historia-de-un-nino-lobo",
    "mensajes-del-mas-alla",
  ];

  const selectedBooks = async () => {
    const books: EnhancedBookModel[] = [];

    for (const slug of selectedSlugs) {
      const book = await booksService.getBySlug(slug);
      books.push(book);
    }

    return books;
  };

  return <BookGrid books={await selectedBooks()} />;
};
