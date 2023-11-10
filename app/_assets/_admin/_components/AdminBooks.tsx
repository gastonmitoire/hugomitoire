"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { EnhancedBookModel } from "@/app/_books/_service/books.service";

import { Button, Image } from "@nextui-org/react";
import { toast } from "sonner";

import { TrashIcon } from "@heroicons/react/20/solid";

import { booksService } from "@/app/_books/_service/books.service";

interface AdminBooksProps {
  books: EnhancedBookModel[];
}

export const AdminBooks: React.FC<AdminBooksProps> = ({ books }) => {
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    try {
      const confirm = window.confirm(`Seguro que desea eliminar el libro?`);

      if (!confirm) return;

      const deleted = await booksService.delete(slug);

      if (deleted) {
        router.refresh();

        toast.success("Libro eliminado con éxito", { duration: 3000 });
      }
    } catch (error: any | unknown) {
      toast.error(error.title);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {books.map((book) => (
        <picture key={book.id} className="relative p-3">
          <Image
            src={book.cover}
            alt={book.title}
            width={"100%"}
            height={"100%"}
          />

          <Button
            isIconOnly
            className="absolute right-0 top-0 z-10"
            onClick={() => handleDelete(book.slug)}
            size="sm"
            color="danger"
          >
            <TrashIcon className="h-6 w-6 text-light" />
          </Button>
        </picture>
      ))}
    </div>
  );
};
