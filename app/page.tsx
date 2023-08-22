import { Suspense } from "react";

import Loading from "./loading";

import { HeroWithSwiper } from "@/app/_components/HeroWithSwiper";

import { booksService } from "./(routes)/admin/books/_service/books.service";

export default async function Home() {
  const books = await booksService.getAll();

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <HeroWithSwiper books={books} />
      </Suspense>
      <section className="container mx-auto">landing</section>
    </main>
  );
}
