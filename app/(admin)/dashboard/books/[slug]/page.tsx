import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";

import { ChapterForm } from "../../chapters/_components/ChapterForm";

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
          <h2>Capítulos ({book.chapters.length})</h2>

          <Button color="primary" size="sm">
            Crear capítulo
          </Button>
        </div>
        <Spacer y={3} />
        <ChapterForm />
        <Spacer y={3} />
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
