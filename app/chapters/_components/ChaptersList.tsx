"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Chapter } from "@prisma/client";

import Link from "next/link";

import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

import { EnhancedChapter } from "@/app/books/_service/books.service";
interface ChapterListProps {
  chapters: EnhancedChapter[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -50 },
};

export function ChapterList({ chapters }: ChapterListProps) {
  return (
    <section className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
      {chapters.map(({ title, order, text }, index) => (
        <motion.div
          key={index}
          className="flex w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delayChildren: 0.3 }}
          variants={container}
        >
          <AnimatePresence>
            <motion.span
              className={`h-full w-full select-none rounded-sm border border-transparent ${
                cinzel.className
              } ${
                text.length > 0
                  ? "duration-300 hover:border-primary hover:transition-colors"
                  : ""
              }`}
              transition={{ delay: 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              variants={item}
            >
              {text.length > 0 ? (
                <Link
                  href={`/libros/${title.replace(/ /g, "_")}/${order}`}
                  className={`flex bg-darker bg-opacity-50 p-5 text-lg`}
                >
                  <span className="truncate">
                    {order}. {title}
                  </span>
                </Link>
              ) : (
                <span className={`flex bg-darker bg-opacity-50 p-5 text-lg`}>
                  <span className="truncate">
                    {order}. {title}
                  </span>
                </span>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  );
}
