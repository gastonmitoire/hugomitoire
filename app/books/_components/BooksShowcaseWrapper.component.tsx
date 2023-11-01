import { BooksShowcase } from "./BooksShowcase.component";

import { booksService } from "../_service/libros.service";

export const BooksShowcaseWrapper: React.FC = async () => {
  const books = await booksService.getAll();

  return <BooksShowcase books={books} />;
};
