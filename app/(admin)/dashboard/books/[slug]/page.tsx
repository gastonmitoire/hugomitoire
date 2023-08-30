import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

import { booksService } from "../_service/books.service";

interface BooksBySlugPageProps {
  params: {
    slug: string;
  };
}

export default async function BooksBySlugPage({
  params,
}: BooksBySlugPageProps) {
  const book = await booksService.getById(params.slug);

  console.log("book", book);

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center gap-3">
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <Image src={book.cover} alt={book.title} width={300} height={300} />
        <Image
          src={book.secondaryImage}
          alt={book.title}
          width={300}
          height={300}
        />
      </div>

      <div className="">
        <div className="flex items-center gap-5">
          <h2>Chapters ({book.chapters.length})</h2>

          <Button color="primary" size="sm">
            Crear capítulo
          </Button>
        </div>
        <ul className="py-3">
          {book.chapters.map((chapter) => (
            <li key={chapter.id} className="bg-white bg-opacity-10 p-5">
              {chapter.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
