import { BooksShowcase } from "./BooksShowcase.component";

import { booksService } from "../_service/books.service";

export const BooksShowcaseWrapper: React.FC = async () => {
  const books = await booksService.getAll();

  return (
    <BooksShowcase
      books={[
        ...books,
        ...books,
        ...books,
        ...books,
        ...books,
        ...books,
        ...books,
        ...books,
        ...books,
      ]}
    />
  );
};
