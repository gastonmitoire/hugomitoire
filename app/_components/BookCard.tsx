"use client";

import React from "react";

import { Book as BookModel } from "@prisma/client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

import { booksService } from "../(routes)/admin/books/_service/books.service";

export const BookCard: React.FC<{ book: BookModel }> = ({ book }) => {
  function handleDelete(id: string) {
    booksService.delete(id);
  }
  return (
    <div key={book.id} className="w-1/4 p-2">
      <Image src={book.cover} alt={book.title} />
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p>{book.description}</p>
      <Image src={book.secondaryImage} alt={book.title} height={100} />

      <Button color="warning">Edit</Button>
      <Button color="danger" onClick={() => handleDelete(book.id)}>
        Delete
      </Button>
    </div>
  );
};