import { BookFeatured } from "./BookFeatured.component";

import { booksService } from "../_service/books.service";

export const BookFeaturedWrapper: React.FC = async () => {
  const bookFeatured = await booksService.getBySlug("criaturas-celestes");
  return (
    <div className="book-featured-wrapper">
      <BookFeatured
        coverImageUrl={bookFeatured.cover}
        description={bookFeatured.description}
        featuredText={"OLAS"}
        title={bookFeatured.title}
      />
    </div>
  );
};
