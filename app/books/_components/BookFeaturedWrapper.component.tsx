import { BookFeatured } from "./BookFeatured.component";

import { booksService } from "../_service/books.service";

import { Cinzel } from "next/font/google";
import { Spacer } from "@nextui-org/spacer";

const cinzel = Cinzel({ subsets: ["latin-ext"] });

export const BookFeaturedWrapper: React.FC = async () => {
  const bookFeatured = await booksService.getBySlug("criaturas-celestes");
  return (
    <div className="book-featured-wrapper">
      <BookFeatured
        coverImageUrl={bookFeatured.cover}
        description={bookFeatured.description}
        featuredText={
          <p className={`${cinzel.className} text-2xl`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat
            temporibus dolore quisquam ratione laboriosam quam aspernatur
            tenetur illum cumque nostrum distinctio excepturi odit perferendis,
            nulla commodi quod alias doloremque?
            <Spacer y={3} />
            <cite className="block text-right text-xl">
              - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </cite>
          </p>
        }
        title={bookFeatured.title}
      />
    </div>
  );
};
