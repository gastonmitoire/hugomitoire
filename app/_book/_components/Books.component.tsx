"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

import { Button, Card, CardFooter, Chip, Image, Link } from "@nextui-org/react";

const cinzel = Cinzel({ subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

import { EnhancedBookModel } from "../_service/books.service";

interface BooksProps {
  books: EnhancedBookModel[];
}

interface ContainerLayout {
  mode: "grid" | "list";
}

export const Books: React.FC<BooksProps> = ({ books }) => {
  const [containerLayout, setContainerLayout] = useState<ContainerLayout>({
    mode: "grid",
  });

  const containerStyles = {
    grid: "grid grid-cols-auto-fit-300 gap-5",
    list: "",
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

  return (
    <section className="container mx-auto min-h-screen py-20">
      <div className={containerStyles[containerLayout.mode]}>
        {books.map((book) => (
          <Card
            as={Link}
            key={book.id}
            href={`/libros/${book.slug}`}
            className="group border-none"
            isHoverable
            isFooterBlurred
            radius="lg"
          >
            <Image
              src={book.cover}
              alt={book.title}
              style={{ height: "470px" }}
              className="cursor-pointer"
            />

            <CardFooter className="absolute bottom-1 z-10 w-[calc(100%_-_8px)] justify-between gap-5 overflow-hidden rounded-large border-1 border-white/20 bg-dark/50 py-1 shadow-small before:rounded-xl before:bg-white/10 group-hover:bg-primary group-hover:[&>p]:text-darker">
              <p
                className={`text-tiny font-semibold text-white/80 ${reggaeOne.className}`}
              >
                {book.title}
              </p>
              <Chip
                className={`bg-secondary/70 text-tiny text-white ${cinzel.className}`}
                variant="flat"
                color="default"
                radius="lg"
              >
                {book.type}
              </Chip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
