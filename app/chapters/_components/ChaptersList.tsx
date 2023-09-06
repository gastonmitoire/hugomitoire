"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Chapter } from "@prisma/client";

import Link from "next/link";

import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

interface ChapterListProps {
  chapters: Chapter[];
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
      {chapters.map((chapter, index) => (
        <motion.div
          key={index}
          className="flex w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delayChildren: 0.5 }}
          variants={container}
        >
          <AnimatePresence>
            <motion.span
              className="h-full w-full rounded-sm border border-transparent duration-300 hover:border-primary hover:transition-colors"
              transition={{ delay: index * 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              variants={item}
            >
              <Link
                href={`/libros/${chapter.title.replace(/ /g, "_")}/${
                  chapter.order
                }`}
                className={`flex bg-darker bg-opacity-50 p-5 text-lg ${cinzel.className}`}
              >
                <span className="truncate">
                  {chapter.order}. {chapter.title}
                </span>
              </Link>
            </motion.span>
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  );
}
