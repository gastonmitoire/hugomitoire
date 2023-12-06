"use client";
import React from "react";

import { EnhancedBookModel } from "../_service/books.service";

import { motion } from "framer-motion";

import { Spacer } from "@nextui-org/spacer";

import { ChapterList } from "../../_chapters/_components/ChaptersList";

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
      className="h-full overflow-y-auto bg-dark bg-opacity-50 backdrop-blur-md scrollbar-hide"
    >
      <h3
        className={`px-5 pt-10 text-right text-5xl text-light text-opacity-20 ${reggaeOne.className}`}
      >
        Detalles
      </h3>
      <div className="flex flex-col border-b-large border-light border-opacity-20 p-7">
        <h3 className={`text-3xl text-light ${reggaeOne.className}`}>
          {title}
        </h3>
        <Spacer y={3} />
        <h5
          className={`text-xl text-light text-opacity-70 ${cinzel.className}`}
        >
          {type} | {genre.name} | {genre.ageRange}
        </h5>
        <Spacer y={5} />
        <p className={`text-xl ${bellefair.className}`}>{description}</p>
      </div>

      <h3
        className={`px-5 pt-10 text-right text-5xl text-light text-opacity-20 ${reggaeOne.className}`}
      >
        Capítulos
      </h3>
      <div
        id="chapters"
        className="border-b-large border-light border-opacity-20 p-7"
      >
        <ChapterList chapters={chapters} />
      </div>
    </motion.div>
  );
};
