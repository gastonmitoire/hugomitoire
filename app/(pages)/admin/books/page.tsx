import { Image } from "@nextui-org/image";

import { booksService } from "@/app/_books/_service/books.service";

export default async function AdminBooksPage() {
  const books = await booksService.getAll();

  return (
    <div className="grid grid-cols-5">
      {books.map((book) => (
        <div key={book.id} className="col-span-1">
          <Image src={book.cover} alt={book.title} width={200} height={300} />
        </div>
      ))}
    </div>
  );
}
