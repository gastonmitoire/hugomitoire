import { BookFeaturedWrapper } from "@/app/_book/_components/BookFeaturedWrapper.component";
import { BookGridWrapper } from "@/app/_book/_components/BookGridWrapper.component";

export default function Home() {
  return (
    <main className="min-h-screen">
      <BookFeaturedWrapper />
      <BookGridWrapper />
    </main>
  );
}
