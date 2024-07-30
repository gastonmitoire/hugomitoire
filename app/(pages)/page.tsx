import { BookFeatured } from "../_book/_components/BookFeatured.component";
import { BookFeaturedWrapper } from "../_book/_components/BookFeaturedWrapper.component";
import { BookGrid } from "../_book/_components/BookGrid.component";
import { BookGridWrapper } from "../_book/_components/BookGridWrapper.component";
import { booksService } from "../_book/_service/books.service";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <BookFeaturedWrapper />
      <BookGridWrapper />
    </main>
  );
}
