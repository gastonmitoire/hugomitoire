import { BookFeaturedWrapper } from "../_book/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../_book/_components/BookGridWrapper.component";

export default function Home() {
  return (
    <main className="min-h-screen">
      <BookFeaturedWrapper />
      <BookGridWrapper />
    </main>
  );
}
