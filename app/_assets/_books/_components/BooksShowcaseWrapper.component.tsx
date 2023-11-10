import { BooksShowcase } from "./BooksShowcase.component";

import { booksService } from "../_service/books.service";

export const BooksShowcaseWrapper: React.FC = async () => {
  const showcaseSlugs = [
    "cuentos-de-terror-para-franco-i",
    "cuentos-de-terror-para-franco-ii",
    "cuentos-de-terror-para-franco-iii",
    "cuentos-de-terror-para-franco-iv",
    "cuentos-de-terror-para-franco-v",
    "cuentos-de-terror-para-franco-vi",
    "cuentos-de-terror-para-franco-vii",
    "cuentos-de-terror-para-franco-viii",
    "cuentos-de-terror-para-franco-ix",
  ];

  const books = await Promise.all(
    showcaseSlugs.map(async (slug) => {
      const book = await booksService.getBySlug(slug);

      return book;
    })
  );

  return <BooksShowcase books={books} />;
};
