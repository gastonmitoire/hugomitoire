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
        <ChapterForm bookId={book.id} />
        <Spacer y={3} />
        <ul className="flex max-h-[550px] flex-col gap-3 overflow-auto py-3">
          {book.chapters.reverse().map((chapter) => (
            <li
              key={chapter.id}
              className="flex items-center justify-between bg-white bg-opacity-10 p-5"
            >
              <p>
                {chapter.order} - {chapter.title}
              </p>
              <Button color="danger" size="sm" variant="ghost" isIconOnly>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
