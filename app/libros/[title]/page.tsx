import React from "react";
import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ weight: "400", subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

import { ChapterList } from "../_components/ChaptersList";
import { BookHero } from "../_components/BookHero";

import { booksService } from "../_service/libros.service";
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
    <main>
      <BookHero
        item={{
          title: book.title,
          subtitle: book.type,
          image: book.cover,
          cover: book.cover,
        }}
      />
      <section
        style={{
          backgroundImage: `url(${book.secondaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-gradient-to-b from-black via-transparent to-black py-10">
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
        </div>
      </section>
    </main>
  );
}
