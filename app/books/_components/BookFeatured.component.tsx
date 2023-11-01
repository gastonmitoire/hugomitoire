import React from "react";

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
    <div className="book-featured">
      <div className="book-featured__image-wrapper">
        <img className="book-featured__image" src={coverImageUrl} alt={title} />
      </div>
      <div className="book-featured__text">
        <div className="book-featured__title">{title}</div>
        <div className="book-featured__description">{description}</div>
        <div className="book-featured__featured-text">{featuredText}</div>
      </div>
    </div>
  );
};
