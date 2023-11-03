import NextImage from "next/image";

import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";

import { EnhancedBookModel } from "../_service/books.service";

import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ weight: "400", subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface BookGridProps {
  books: EnhancedBookModel[];
}

export const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  interface GridItemContainerProps {
    children: React.ReactNode;
    className?: string;
  }

  const GridItemContainer: React.FC<GridItemContainerProps> = ({
    children,
    className,
  }) => {
    return (
      <section className={`[&>*]:min-h-[430px] ${className}`}>
        <div className="px-3 py-10 sm:p-20">{children}</div>
      </section>
    );
  };

  interface GridItemProps {
    book: EnhancedBookModel;
    imagePlacement?: "left" | "right";
  }

  const GridItem: React.FC<GridItemProps> = ({
    book,
    imagePlacement = "left",
  }) => {
    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-5 sm:flex-row">
        {imagePlacement === "left" && (
          <Image src={book.cover} alt={book.title} />
        )}

        <p
          className={`flex flex-auto flex-col justify-center gap-5 ${
            imagePlacement === "right" ? "items-end text-right" : "text-left"
          }`}
        >
          <span
            className={`text-3xl font-bold text-white ${reggaeOne.className}`}
          >
            {book.title}
          </span>
          <Spacer y={1} />
          <span
            className={`max-w-[75%] text-xl font-bold text-white ${bellefair.className}`}
          >
            {book.description}
          </span>
        </p>

        {imagePlacement === "right" && (
          <Image src={book.cover} alt={book.title} />
        )}
      </div>
    );
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-2">
      <GridItemContainer className={"bg-darker"}>
        <GridItem book={books[0]} imagePlacement="right" />
      </GridItemContainer>
      <GridItemContainer className={"bg-yellow-500"}>
        <GridItem book={books[0]} />
      </GridItemContainer>
      <GridItemContainer className={"bg-yellow-300"}>
        <GridItem book={books[0]} imagePlacement="right" />
      </GridItemContainer>
      <GridItemContainer className={"bg-dark"}>
        <GridItem book={books[0]} />
      </GridItemContainer>
    </section>
  );
};