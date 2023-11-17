import React from "react";

import { BookGrid } from "./BookGrid.component";

import { EnhancedBookModel } from "../_service/books.service";

import { booksService } from "../_service/books.service";

export const BookGridWrapper: React.FC = async () => {
  const selectedSlugs = [
    "los-ojos-de-mariel",
    "los-ojos-de-mariel",
    "los-ojos-de-mariel",
    "los-ojos-de-mariel",
  ];

  const selectedBooks = async () => {
    const books: EnhancedBookModel[] = [];

    for (const slug of selectedSlugs) {
      const book = await booksService.getBySlug(slug);
      books.push(book);
    }

    return books;
  };

  const isLoaded = (await selectedBooks()) ? true : false;

  return isLoaded ? <BookGrid books={await selectedBooks()} /> : null;
};
