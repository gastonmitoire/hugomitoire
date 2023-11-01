import React from "react";

import { Image } from "@nextui-org/image";

interface BookFeaturedProps {
  title: string;
  description: string;
  coverImageUrl: string;
  featuredText: string;
}

export const BookFeatured: React.FC<BookFeaturedProps> = ({
  title,
  description,
  coverImageUrl,
  featuredText,
}) => {
  return (
    <div className="bg-black">
      <div className="book-featured__image-wrapper">
        <Image src={coverImageUrl} alt={title} width={300} height={450} />
      </div>
      <div className="book-featured__text">
        <div className="book-featured__title">{title}</div>
        <div className="book-featured__description">{description}</div>
        <div className="book-featured__featured-text">{featuredText}</div>
      </div>
    </div>
  );
};
