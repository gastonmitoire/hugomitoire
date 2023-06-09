import { useState, useEffect, useRef } from "react";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";

import { Chapter } from "@prisma/client";
import { db } from "~/utils/db.server";

import { ChapterList } from "~/components/chapter_list";

export const loader = async ({ params }: LoaderArgs) => {
  const formatedTitle = params.bookTitle?.replace(/_/g, " ");
  const book = await db.book.findUnique({
    where: { title: formatedTitle },
    include: {
      genre: true,
      comments: true,
    },
  });

  if (!book) {
    return json(
      { message: `No book found with the title ${params.bookTitle}` },
      { status: 404 }
    );
  }

  const chapters = await db.chapter.findMany({
    where: { bookId: book.id },
    orderBy: { order: "asc" },
  });

  return json({ book, chapters });
};

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
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

export default function LibroRoute() {
  const { book, chapters } = useLoaderData();

  const goToSection = (section: string) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full">
      <div
        className="w-full h-4/5 mb-16"
        style={{
          background: `url(${book.secondaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full h-full"
          style={{
            background: `linear-gradient(3deg, rgba(10, 10, 10, 1) 5rem, rgba(10,10,10, 0.7), rgba(10,10,10, 0.3), rgba(10, 10, 10, 0.2), rgba(10, 10, 10, 0))`,
          }}
        >
          <div className="container flex flex-col items-start justify-end w-full h-full space-y-4">
            <motion.div variants={item}>
              <h1 className="text-5xl font-bold">{book.title}</h1>
            </motion.div>
            <motion.div
              variants={item}
              className="flex items-start lg:items-center gap-5 font-body text-sm text-neutral-400 uppercase tracking-wide"
            >
              <p>{book.type}</p>
              <p>{book.genre.name}</p>
              <p>{book.genre.ageRange}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <nav
          aria-label="Sub navigation"
          role="navigation"
          className="sticky top-0 left-0 uppercase bg-neutral-950 h-full hidden lg:block"
        >
          <ul className="flex items-center justify-center gap-5 py-5 z-10">
            <li
              className="cursor-pointer"
              onClick={() => goToSection("detail-section")}
            >
              Detalles
            </li>
            <li
              className="cursor-pointer"
              onClick={() => goToSection("chapters-section")}
            >
              Capítulos
            </li>
            <li
              className="cursor-pointer"
              onClick={() => goToSection("gallery-section")}
            >
              Galería
            </li>
          </ul>
        </nav>

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          id="detail-section"
          className="w-full h-full scroll-m-16"
        >
          <div className="flex flex-col lg:flex-row h-full container py-8">
            <div className="lg:flex-1 p-8 bg-neutral-900">
              <img src={book.cover} alt="" className="mx-auto w-64" />
            </div>
            <div className="p-8 bg-neutral-900" style={{ flex: "2 1 0%" }}>
              <h1 className="text-4xl font-bold pb-5">Sinopsis</h1>
              <p className="text-xl font-bellefair">{book.description}</p>
            </div>
            <div className="lg:flex-1 flex flex-col gap-5 p-8 bg-neutral-950">
              <span>
                <h3 className="text-2xl font-bold">Fecha de publicación</h3>
                <p className="text-neutral-400">{book.publicationDate}</p>
              </span>
              <span>
                <h3 className="text-2xl font-bold">Ilustrador</h3>
                <p className="text-neutral-400">Maco Pacheco</p>
              </span>
              <span>
                <h3 className="text-2xl font-bold">Editorial</h3>
                <p className="text-neutral-400">Ediciones de La Paz</p>
              </span>
            </div>
          </div>
        </motion.section>

        <motion.section id="chapters-section" className="scroll-m-16">
          <header className="flex items-center py-8 text-neutral-900 bg-white">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold">Capítulos</h1>
            </div>
          </header>
          <motion.div className="py-8">
            <ChapterList chapters={chapters} />
          </motion.div>
        </motion.section>

        <motion.section id="gallery-section" className="scroll-m-16">
          <header className="flex items-center py-8 text-neutral-900 bg-white">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold">Galería</h1>
            </div>
          </header>
          <motion.div className="py-8"></motion.div>
        </motion.section>
      </div>
    </div>
  );
}
