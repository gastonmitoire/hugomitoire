"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { toast } from "sonner";

import { Trash } from "iconsax-react";

import {
  booksService,
  EnhancedBookModel,
} from "../../_books/_service/books.service";

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
    <div className="grid grid-cols-4 gap-3">
      {books.map((book) => (
        <Card
          key={book.id}
          isFooterBlurred
          className="col-span-12 sm:col-span-1"
        >
          <CardHeader className="absolute top-1 z-10 flex-col items-start bg-secondary bg-opacity-90">
            <p className="text-tiny font-bold uppercase text-white/60">
              {book.type + " | " + book.genre?.name}
            </p>
            <h4 className="text-2xl font-medium text-black">Acme camera</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 h-full w-full -translate-y-6 object-cover"
            src={book.cover}
          />
          <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
            <div>
              <p className="text-tiny text-black">Available soon.</p>
              <p className="text-tiny text-black">Get notified.</p>
            </div>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Notify Me
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
