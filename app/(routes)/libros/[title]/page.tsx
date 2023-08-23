import React from "react";
import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ weight: "400", subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

import { ChapterList } from "../_components/ChaptersList";

import { booksService } from "../../admin/books/_service/books.service";
interface LibroByTitleProps {
  params: {
    title: string;
  };
  searchParams: {
    id: string;
  };
}

export default async function LibroByTitle({
  params,
  searchParams,
}: LibroByTitleProps) {
  const { id } = searchParams;
  const book = await booksService.getById(id);
  return (
    <main
      style={{
        backgroundImage: `url(${book.secondaryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "50vh",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-y-5 py-5">
        <Image
          src={book.cover}
          alt={book.title}
          height={400}
          width={350}
          radius="none"
          className="sticky top-0"
        />
      </div>
      <section className="w-full p-3 sm:px-0 bg-black">
        <div className="container mx-auto flex flex-col gap-3">
          <div
            className={`flex items-center gap-1 text-base uppercase ${cinzel.className}`}
          >
            <span>{book.type}</span>|<span>{book.genre.name}</span>|
            <span>{book.genre.ageRange}</span>
          </div>
          <h1 className={`text-3xl ${reggaeOne.className}`}>{book.title}</h1>
          <span className="p-3 border border-white border-opacity-30 rounded-md">
            <p className={`text-xl text-white ${bellefair.className}`}>
              {book.description}
            </p>
          </span>
        </div>
      </section>
      <section className="w-full p-3 sm:px-0 bg-black bg-opacity-70">
        <div className="container mx-auto">
          <ChapterList
            chapters={[
              {
                id: "1",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 1",
                order: 1,
              },
              {
                id: "2",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 2",
                order: 2,
              },
              {
                id: "3",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 3",
                order: 3,
              },
              {
                id: "4",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 4",
                order: 4,
              },
              {
                id: "5",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 5",
                order: 5,
              },
              {
                id: "6",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 6",
                order: 6,
              },
              {
                id: "7",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 7",
                order: 7,
              },
              {
                id: "8",
                bookId: book.id,
                type: "chapter",
                title: "Capítulo 8",
                order: 8,
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
