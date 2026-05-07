"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookCard } from "./BookCard";
import { BookData } from "@/data/types";

interface BooksGridProps {
  books: BookData[];
  title?: string;
  className?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function BooksGrid({ books, title, className }: BooksGridProps) {
  return (
    <section className={className}>
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl font-semibold text-text-primary tracking-wide">
            {title}
          </h2>
          <div className="mt-3 h-px w-14 bg-white/20" />
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5"
      >
        {books.map((book, i) => (
          <motion.div key={book.id} variants={item}>
            <BookCard book={book} priority={i < 5} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
