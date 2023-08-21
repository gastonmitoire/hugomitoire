import { Image } from "@nextui-org/image";

import { booksService } from "./_service/books.service";

export default async function AdminBooksPage() {
  const books = await booksService.getAll();

  console.log(books);

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold">Books</h1>

      <div className="flex flex-wrap">
        {books.map((book) => (
          <div key={book.id} className="w-1/4 p-2">
            <Image src={book.cover} alt={book.title} />
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>{book.description}</p>

            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}
