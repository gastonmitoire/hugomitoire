import { BookFeaturedWrapper } from "../_book/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../_book/_components/BookGridWrapper.component";
import { BooksSwiper } from "../_book/_components/BooksSwiper";
import { BooksSwiperWrapper } from "../_book/_components/BooksSwiperWrapper";

export default function Home() {
  return (
    <main className="min-h-screen">
      <BooksSwiperWrapper />
      <BookFeaturedWrapper />
      <BookGridWrapper />
    </main>
  );
}
