import { AdminBooks } from "./AdminBooks";

import { booksService } from "../../_books/_service/books.service";

export const AdminBooksWrapper: React.FC = async () => {
  const books = await booksService.getAll();
  return <AdminBooks books={books} />;
};
