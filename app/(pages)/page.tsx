import { Suspense } from "react";

import { Spacer } from "@nextui-org/spacer";

import Loading from "./loading";

import { BookFeaturedWrapper } from "../_books/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../_books/_components/BookGridWrapper.component";
import { BooksShowcaseWrapper } from "../_books/_components/BooksShowcaseWrapper.component";

export default async function Home() {
  const generateLandingPageStyles = () => {
    const landingPageStyles = {
      sm: "",
      xl: "",
    } as any;

    // add prefix to the class names (sm: or xl:)
    Object.keys(landingPageStyles).forEach((key) => {
      landingPageStyles[key] = Object.keys(landingPageStyles[key]).map(
        (className) => `${key}:${className}`
      );
    });

    // flatten the object
    landingPageStyles.sm = landingPageStyles.sm.flat();
    landingPageStyles.xl = landingPageStyles.xl.flat();

    return landingPageStyles;
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <Suspense fallback={<Loading />}>
        <div className="xl:no-scrollbar xl:h-screen xl:snap-y xl:snap-mandatory xl:overflow-y-scroll">
          <section className="snap-start">
            <BooksShowcaseWrapper />
          </section>

          <section className="snap-start">
            <BookFeaturedWrapper />
          </section>

          <section className="snap-start pt-16">
            <BookGridWrapper />
          </section>
        </div>
      </Suspense>
    </main>
  );
}
