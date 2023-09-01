import { Image } from "@nextui-org/image";
import Link from "next/link";

import { booksService } from "./_service/libros.service";

export default async function LibrosPage() {
  const books = await booksService.getAll();

  return (
    <main className="container mx-auto py-20">
      <div className="grid grid-cols-1 place-items-center gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
