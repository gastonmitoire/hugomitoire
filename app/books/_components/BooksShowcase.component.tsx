"use client";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import { EnhancedBookModel } from "../_service/libros.service";

interface BooksShowcaseProps {
  books: EnhancedBookModel[];
}

export const BooksShowcase: React.FC<BooksShowcaseProps> = ({ books }) => {
  const rotations = [3, -5, -4, 4, 3, -5, -4, 4]; // Conjunto predefinido de rotaciones

  const bookItemVariants = (index: number) => {
    const rotation = rotations[index % rotations.length]; // Asignar rotación en función de la posición
    return {
      hidden: {
        opacity: 0,
        scale: 0.5,
        rotate: rotation,
      },
      visible: {
        opacity: 0.5,
        scale: 1,
        rotate: rotation,
      },
      whileHover: {
        opacity: 1,
        scale: 1.1,
        rotate: 0,
      },
    };
  };

  const FeaturedItem = () => {
    return (
      <div className="flex h-full w-full items-center">
        <Image
          src={books[0].cover}
          width="100%"
          height="100%"
          alt="Book Cover"
          radius="none"
        />
      </div>
    );
  };

  const BookItem = ({ index }: { index: number }) => {
    return (
      <motion.div
        variants={bookItemVariants(index)}
        whileHover="whileHover"
        initial="hidden"
        animate="visible"
        className="h-full w-full cursor-pointer bg-gray-200"
      ></motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid h-screen w-full grid-cols-3 items-center justify-items-center gap-10 px-20"
    >
      <div className="h-full w-full py-20">
        <FeaturedItem />
      </div>
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-10 py-20">
        {[0, 1, 2, 3].map((index) => (
          <BookItem key={index} index={index} />
        ))}
      </div>
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-10 py-20">
        {[4, 5, 6, 7].map((index) => (
          <BookItem key={index} index={index} />
        ))}
      </div>
    </motion.div>
  );
};
