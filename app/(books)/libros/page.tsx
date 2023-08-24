import { Image } from "@nextui-org/image";
import Link from "next/link";

import { booksService } from "../_service/books.service";

export default async function LibrosPage() {
  const books = await booksService.getAll();

  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {books.map((book) => (
          <Link
            key={book.id}
            href={{
              pathname: `/libros/${book.title}`,
              query: { id: book.id },
            }}
          >
            <Image
              src={book.cover}
              alt={book.title}
              height={400}
              width={350}
              radius="none"
              isBlurred
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
