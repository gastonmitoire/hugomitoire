"use client";

import React from "react";
import { Divider, Image, Spacer } from "@nextui-org/react";
import { motion } from "framer-motion";

import { EnhancedBookModel } from "../_service/libros.service";

import { Cinzel, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin-ext"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface HeroProps {
  book: EnhancedBookModel;
  actions?: React.ReactNode;
  className?: string;
}

// Framer Motion config
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

export function BookHero({
  book: { id, title, description, cover, secondaryImage, slug, type, genre },
  actions,
  className,
}: HeroProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.7 }}
      className={`relative h-full w-full ${className || ""}`}
      style={{
        background: `url(${secondaryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 30%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="h-full w-full px-3 pb-10 pt-20 sm:px-0"
        style={{
          background: `linear-gradient(3deg, rgba(0, 0, 0, 1) 5rem, rgba(0,0,0, 0.7), rgba(0,0,0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))`,
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container mx-auto h-full w-full"
        >
          <div className="relative flex h-full w-full flex-col items-start justify-end space-y-4 ">
            <div className="flex flex-col items-start justify-end">
              <Image
                as={motion.img}
                src={cover}
                className="w-64 2xl:w-80"
                variants={itemAnimation}
                alt={`tapa-${title}`}
                radius="none"
              />
              <Spacer y={3} />
              <motion.div variants={itemAnimation}>
                <h1 className={`text-5xl font-bold ${reggaeOne.className}`}>
                  {title}
                </h1>
              </motion.div>
              <Spacer y={5} />
              <motion.div
                variants={itemAnimation}
                className="font-body flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-white text-opacity-50 2xl:items-center"
              >
                <p className={`uppercase ${cinzel.className}`}>{type}</p>
                <Divider orientation="vertical" />
                <p className={`uppercase ${cinzel.className}`}>{genre.name}</p>
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full border px-1 text-center text-white opacity-50">
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-black text-lg font-normal">
                    +
                  </span>
                  <p className={`z-10 uppercase ${cinzel.className}`}>
                    {genre.ageRange.replaceAll("+", "")}
                  </p>
                </span>
              </motion.div>
              {actions && (
                <>
                  <Spacer y={5} />
                  {actions}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
