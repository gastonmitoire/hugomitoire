import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

import { BookCard } from "@/app/_components/BookCard";

import { booksService } from "./_service/books.service";

export default async function AdminBooksPage() {
  const books = await booksService.getAll();

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold">Books</h1>

      <div className="flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
