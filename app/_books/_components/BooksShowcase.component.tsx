"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Skeleton } from "@nextui-org/react";
import { EnhancedBookModel } from "../_service/books.service";
import { CustomParticles } from "@/app/_shared/_components";

interface BooksShowcaseProps {
  books: EnhancedBookModel[];
}

export const BooksShowcase: React.FC<BooksShowcaseProps> = ({ books }) => {
  const rotations = [3, -5, -4, 4, 3, -5, -4, 4]; // Conjunto predefinido de rotaciones

  const isLoaded = books.length > 0;

  const bookItemVariants = (index: number) => {
    const rotation = rotations[index % rotations.length]; // Asignar rotación en función de la posición
    return {
      hidden: {
        opacity: 0,
        scale: 0.5,
        rotate: 0,
      },
      visible: {
        opacity: 0.5,
        scale: 1,
        rotate: rotation,
        transition: {
          delay: index * 0.1, // Agregar un retraso al ingreso basado en la posición
          duration: 0.3,
          ease: "easeInOut",
        },
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
      <div className="flex h-full w-full cursor-pointer items-center">
        {isLoaded ? (
          <Image
            src={books[0].cover}
            width="100%"
            height="100%"
            alt="Book Cover"
            radius="none"
          />
        ) : (
          <Skeleton className="h-full w-full"></Skeleton>
        )}
      </div>
    );
  };

  const BookItem = ({ index }: { index: number }) => {
    return (
      <motion.div
        variants={bookItemVariants(index)}
        initial="hidden"
        animate="visible"
        whileHover="whileHover"
        className="flex h-full w-full max-w-sm cursor-pointer items-center justify-center"
      >
        {isLoaded ? (
          <Image
            src={books[index].cover}
            width="100%"
            height="100%"
            alt="Book Cover"
            radius="none"
            className="mx-auto"
          />
        ) : (
          <Skeleton className="h-full w-full"></Skeleton>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative grid min-h-screen w-full grid-flow-row items-center justify-center gap-10 px-3 py-20 sm:px-20 xl:grid-cols-3 xl:gap-10 xl:py-0"
    >
      <div className="grid h-full w-full justify-center xl:flex xl:py-20">
        <FeaturedItem />
      </div>
      <div className="grid h-full w-full grid-cols-2 place-items-center gap-10 sm:grid-cols-4 xl:grid-cols-2 xl:grid-rows-2 xl:py-20">
        <AnimatePresence>
          {[0, 1, 2, 3].map((index) => (
            <BookItem key={index} index={index} />
          ))}
        </AnimatePresence>
      </div>
      <div className="grid h-full w-full grid-cols-2 place-items-center gap-10 sm:grid-cols-4 xl:grid-cols-2 xl:grid-rows-2 xl:py-20">
        <AnimatePresence>
          {[4, 5, 6, 7].map((index) => (
            <BookItem key={index} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
