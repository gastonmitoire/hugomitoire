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
    <main>
      <Suspense fallback={<Loading />}>
        <section className="h-screen">
          <BooksShowcaseWrapper />
        </section>

        <section className="h-screen">
          <BookFeaturedWrapper />
        </section>

        <section className="h-screen">
          <BookGridWrapper />
        </section>
      </Suspense>
    </main>
  );
}
