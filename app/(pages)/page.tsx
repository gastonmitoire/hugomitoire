import { Spacer } from "@nextui-org/spacer";

import { BookFeaturedWrapper } from "../_books/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../_books/_components/BookGridWrapper.component";
import { BooksShowcaseWrapper } from "../_books/_components/BooksShowcaseWrapper.component";

import { CustomParticles } from "../_shared/_components";

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
      <BooksShowcaseWrapper />
      <BookFeaturedWrapper />
      <BookGridWrapper />
    </main>
  );
}
