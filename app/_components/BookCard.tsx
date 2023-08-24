"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Book as BookModel } from "@prisma/client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

import { booksService } from "../libros/_service/libros.service";

export const BookCard: React.FC<{ book: BookModel }> = ({ book }) => {
  const router = useRouter();
  async function handleDelete(id: string) {
    const deletedBook = await booksService.delete(id);

    console.log("deleted book: ", deletedBook);

    if (deletedBook) {
      router.refresh();
    }
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
