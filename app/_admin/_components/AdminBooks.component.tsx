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
} from "../../_book/_service/books.service";

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
          isPressable
          disableRipple
          onPress={() => router.push(`books/${book.slug}`)}
          isFooterBlurred
          className="col-span-12 sm:col-span-1"
        >
          <CardHeader className="absolute z-10 flex-col items-start bg-secondary bg-opacity-90">
            <p className="text-tiny font-bold uppercase text-white/70">
              {book.type + " | " + book.genre?.name}
            </p>
            <h4 className="text-2xl font-medium">{book.title}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 h-full w-full -translate-y-6 object-cover"
            src={book.cover}
          />
          <CardFooter className="absolute bottom-0 z-10 flex-col justify-between gap-3 border-t-1 border-zinc-100/50 bg-dark/70">
            <Button
              className="text-tiny font-bold"
              color="secondary"
              radius="full"
              size="sm"
            >
              {book.chapters.length} Capitulos
            </Button>
            <div className="flex w-full justify-between [&>p]:flex [&>p]:flex-col [&>p]:gap-1 [&>p]:text-center [&>p]:font-semibold">
              <p>
                <span className="text-tiny font-normal">Ilustrador</span>
                {book.illustrator.username}
              </p>
              <p>
                <span className="text-tiny font-normal">Editorial</span>
                {book.publisher.username}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
