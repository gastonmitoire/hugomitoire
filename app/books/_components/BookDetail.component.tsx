"use client";
import React from "react";

import { EnhancedBookModel } from "../_service/libros.service";

import { motion } from "framer-motion";

import { Spacer } from "@nextui-org/spacer";

import { ChapterList } from "@/app/chapters/_components/ChaptersList";

import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface BookDetailProps {
  book: Pick<EnhancedBookModel, "title" | "genre" | "description" | "type"> & {
    chapters: EnhancedBookModel["chapters"];
  };
}

// reusable component for book detail heading
interface BookDetailHeadingProps {
  children: React.ReactNode;
  section: string;
  onClick: (section: string) => void;
  className?: string;
}
const BookDetailHeading: React.FC<BookDetailHeadingProps> = ({
  children,
  section,
  onClick,
  className,
}) => {
  return (
    <h5
      className={`sticky top-0 z-10 cursor-pointer select-none bg-darker px-5 py-3 text-xl text-lighter text-opacity-70 ${
        reggaeOne.className
      } ${className ? className : null}`}
      onClick={() => onClick(section)}
    >
      {children}
    </h5>
  );
};

export const BookDetail: React.FC<BookDetailProps> = ({
  book: { title, genre, description, type, chapters },
}) => {
  function handleSectionClick(section: string) {
    // if section is details, scroll to book-detail top
    if (section === "details") {
      const bookDetail = document.getElementById(`book-detail`);
      if (bookDetail) {
        bookDetail.className = bookDetail.className.replace(
          "bg-dark",
          "bg-darker"
        );
        bookDetail.scrollTo({ top: 0, behavior: "smooth" });
        bookDetail.scrollIntoView({ behavior: "smooth" });
      }
    }

    // if section is chapters, scroll to chapters top
    if (section === "chapters") {
      const chapters = document.getElementById("chapters");
      if (chapters) {
        chapters.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  // TODO: add chapters

  // motion config for book detail (slide in from bottom slowly)
  const bookDetailVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={bookDetailVariants}
      id="book-detail"
      className="overflow-y-auto scrollbar-hide"
    >
      <BookDetailHeading section="details" onClick={handleSectionClick}>
        Detalles
      </BookDetailHeading>
      <div className="flex flex-col bg-dark bg-opacity-50 p-7 backdrop-blur-md">
        <h3 className={`text-3xl ${cinzel.className}`}>{title}</h3>
        <Spacer y={3} />
        <h5 className={`text-xl opacity-70 ${cinzel.className}`}>
          {type} | {genre.name} | {genre.ageRange}
        </h5>
        <Spacer y={5} />
        <p className={`text-xl ${bellefair.className}`}>{description}</p>
      </div>

      <BookDetailHeading
        section="chapters"
        onClick={handleSectionClick}
        className="top-12"
      >
        Capítulos
      </BookDetailHeading>
      <div id="chapters" className="bg-dark bg-opacity-50 p-7 backdrop-blur-md">
        <ChapterList chapters={chapters} />
      </div>
    </motion.div>
  );
};
