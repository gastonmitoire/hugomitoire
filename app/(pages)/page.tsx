import { Suspense } from "react";

import { Spacer } from "@nextui-org/spacer";

import Loading from "./loading";

import { CustomParticles } from "@components/index";

import { BookFeaturedWrapper } from "../books/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../books/_components/BookGridWrapper.component";
import { BooksShowcaseWrapper } from "../books/_components/BooksShowcaseWrapper.component";

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
