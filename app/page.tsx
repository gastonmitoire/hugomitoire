import { Suspense } from "react";

import { Spacer } from "@nextui-org/spacer";

import Loading from "./loading";

import { BooksSwiper } from "./libros/_components/BooksSwiper";
import { CustomParticles } from "./shared/_components/CustomParticles";
import { HeroWithSwiper } from "@/app/_components/HeroWithSwiper";

import { booksService } from "./libros/_service/libros.service";

export default async function Home() {
  const books = await booksService.getAll();

  console.log("books", books);

  const booksCover = [...books, ...books, ...books].map((book) => {
    return {
      id: book.id,
      cover: book.cover,
      title: book.title,
      slug: book.slug,
    };
  });

  return (
    <main className="min-h-screen pb-20">
      <Suspense fallback={<Loading />}>
        <HeroWithSwiper books={books} />
      </Suspense>
      <Spacer y={24} />
      <section className="container mx-auto w-full px-3 py-3">
        <Suspense fallback={<Loading />}>
          <BooksSwiper slides={booksCover} />
        </Suspense>
      </section>

      <CustomParticles />
    </main>
  );
}
