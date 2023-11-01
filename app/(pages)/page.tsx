import { Suspense } from "react";

import { Spacer } from "@nextui-org/spacer";

import Loading from "./loading";

import { CustomParticles } from "@components/index";

import { BooksShowcaseWrapper } from "../books/_components/BooksShowcaseWrapper.component";

import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin-ext"] });

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <BooksShowcaseWrapper />
        <CustomParticles />
      </Suspense>
    </main>
  );
}
