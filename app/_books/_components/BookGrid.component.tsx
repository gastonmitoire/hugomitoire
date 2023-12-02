import NextImage from "next/image";

import { Button } from "@nextui-org/button";
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
        {children}
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
    function ItemImage() {
      return (
        <picture>
          <Image src={book.cover} alt={book.title} width={370} shadow="md" />
        </picture>
      );
    }

    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-5 p-20 sm:flex-row">
        {imagePlacement === "left" && (
          <figure>
            <ItemImage />
          </figure>
        )}

        <p
          className={`flex-0 flex w-full flex-col justify-center ${
            imagePlacement === "right" ? "items-end text-right" : "text-left"
          }`}
        >
          <span
            className={`text-xl font-bold uppercase text-white ${cinzel.className}`}
          >
            {book.type}
          </span>
          <Spacer y={1} />
          <span
            className={`text-3xl font-bold text-white ${reggaeOne.className}`}
          >
            {book.title}
          </span>
          <Spacer y={3} />
          <span
            className={`max-w-[75%] text-xl font-bold text-white ${bellefair.className}`}
          >
            {book.description}
          </span>
          <Spacer y={7} />
          <span>
            <Button variant="flat" color="primary" className="uppercase">
              Ver más
            </Button>
          </span>
        </p>

        {imagePlacement === "right" && (
          <figure>
            <ItemImage />
          </figure>
        )}
      </div>
    );
  };

  return (
    <section className="grid grid-cols-1 bg-opacity-50 xl:grid-cols-2 xl:grid-rows-2">
      <GridItemContainer className={"bg-[#384347]"}>
        <GridItem book={books[0]} imagePlacement="right" />
      </GridItemContainer>
      <GridItemContainer className={"bg-[#6B3E34]"}>
        <GridItem book={books[1]} />
      </GridItemContainer>
      <GridItemContainer className={"bg-[#6B242A]"}>
        <GridItem book={books[2]} imagePlacement="right" />
      </GridItemContainer>
      <GridItemContainer className={"bg-[#2F3940]"}>
        <GridItem book={books[3]} />
      </GridItemContainer>
    </section>
  );
};
