"use client";
import React from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

import { EnhancedBookModel } from "../_service/books.service";

interface BooksProps {
  books: EnhancedBookModel[];
}

export const Books: React.FC<BooksProps> = ({ books }) => {
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };
  return (
    <section className="container mx-auto min-h-screen py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        {books.map((book) => (
          <Image
            as={motion.img}
            key={book.id}
            src={book.cover}
            alt={book.title}
            width={"100%"}
            className="cursor-pointer"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="whileHover"
            whileTap="whileTap"
          />
        ))}
      </div>
    </section>
  );
};
