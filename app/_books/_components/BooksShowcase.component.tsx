"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Link, Skeleton } from "@nextui-org/react";
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
        opacity: 0.7,
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
          <Link href={`/libros/${books[8].slug}`}>
            <Image
              src={books[8].cover}
              width="100%"
              height="100%"
              alt="Book Cover"
              radius="none"
            />
          </Link>
        ) : (
          <Skeleton className="h-full w-full"></Skeleton>
        )}
      </div>
    );
  };

  const BookItem = ({ index }: { index: number }) => {
    return (
      <motion.figure
        variants={bookItemVariants(index)}
        initial="hidden"
        animate="visible"
        whileHover="whileHover"
        className="flex h-full w-full max-w-sm cursor-pointer items-center justify-center"
      >
        {isLoaded ? (
          <Link href={`/libros/${books[index].slug}`}>
            <Image
              src={books[index].cover}
              width="100%"
              height="100%"
              alt="Book Cover"
              radius="none"
            />
          </Link>
        ) : (
          <Skeleton className="h-full w-full"></Skeleton>
        )}
      </motion.figure>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative grid min-h-screen w-full grid-flow-row items-center justify-center gap-10 px-3 py-20 sm:px-20 md:grid-cols-3 xl:grid-rows-2 xl:gap-10 xl:py-20"
    >
      <div className="col-span-1 grid h-full w-full justify-center md:col-start-2 xl:col-start-auto xl:row-span-2 xl:flex">
        <FeaturedItem />
      </div>
      <div className="grid h-full w-full grid-cols-2 place-items-center gap-10 sm:grid-cols-4 md:col-span-3 xl:col-span-2 xl:grid-cols-4">
        <AnimatePresence>
          {[7, 6, 5, 4].map((index) => (
            <BookItem key={index} index={index} />
          ))}
        </AnimatePresence>
      </div>
      <div className="grid h-full w-full grid-cols-2 place-items-center gap-10 sm:grid-cols-4 md:col-span-3 xl:col-span-2 xl:grid-cols-4">
        <AnimatePresence>
          {[3, 2, 1, 0].map((index) => (
            <BookItem key={index} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
