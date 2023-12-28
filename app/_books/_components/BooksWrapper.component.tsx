import { Books } from "./Books.component";

import { booksService } from "../_service/books.service";

export const BooksWrapper: React.FC = async () => {
  const books = await booksService.getAll();

  return <Books books={books} />;
};
