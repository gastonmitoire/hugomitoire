import { AdminBooks } from "./AdminBooks.component";

import { booksService } from "../../_book/_service/books.service";

export const AdminBooksWrapper: React.FC = async () => {
  const books = await booksService.getAll();
  return <AdminBooks books={books} />;
};
