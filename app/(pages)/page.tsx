import { Suspense } from "react";

import { Spacer } from "@nextui-org/spacer";

import Loading from "./loading";

import { CustomParticles } from "@/app/_shared/_components/index";

import { BookFeaturedWrapper } from "../_books/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../_books/_components/BookGridWrapper.component";
import { BooksShowcaseWrapper } from "../_books/_components/BooksShowcaseWrapper.component";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <BooksShowcaseWrapper />

        <BookFeaturedWrapper />

        <BookGridWrapper />
      </Suspense>
    </main>
  );
}
