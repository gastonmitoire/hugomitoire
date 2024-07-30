import { BookFeaturedWrapper } from "../_book/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "../_book/_components/BookGridWrapper.component";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center pt-10">
      <BookFeaturedWrapper />
      <BookGridWrapper />
    </main>
  );
}
