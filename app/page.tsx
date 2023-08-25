import { Suspense } from "react";

import Loading from "./loading";

import { CardWithSwiper } from "./_components/CardWithSwiper";
import { HeroWithSwiper } from "@/app/_components/HeroWithSwiper";

import { booksService } from "./libros/_service/libros.service";
import { Spacer } from "@nextui-org/spacer";

export default async function Home() {
  const books = await booksService.getAll();

  console.log("books", books);

  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <HeroWithSwiper books={books} />
      </Suspense>
      <Spacer y={24} />
      <section className="container mx-auto px-3 sm:px-0">
        <Suspense fallback={<Loading />}>
          <CardWithSwiper books={books} />
        </Suspense>
      </section>
    </main>
  );
}
