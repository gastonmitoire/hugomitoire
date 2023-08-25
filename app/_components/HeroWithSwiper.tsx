"use client";

import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css"; // Asegúrate de importar los estilos de Swiper
import Swiper from "swiper/bundle";
import { Bellefair, Reggae_One } from "next/font/google";

const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

import { BookHero } from "../libros/_components/BookHero";

import { EnhancedBookModel } from "../libros/_service/libros.service";

interface HeroWithSwiperProps {
  books: EnhancedBookModel[];
}

export const HeroWithSwiper: React.FC<HeroWithSwiperProps> = ({ books }) => {
  useEffect(() => {
    new Swiper(".swiper-container", {
      speed: 500,
      loop: true,
      cssMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      parallax: true,
    });
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="swiper-container">
        <div className="swiper-wrapper h-[90vh]">
          {books.map((book) => (
            <div
              key={book.id}
              className="swiper-slide relative overflow-hidden"
            >
              <BookHero
                book={book}
                className="h-[75vh] sm:h-[90vh]"
                actions={
                  <Link href={`/libros/${book.slug}`}>
                    <Button color="primary" size="sm">
                      Ver más
                    </Button>
                  </Link>
                }
              />
            </div>
          ))}
        </div>
        <div className="swiper-pagination [&>span]:bg-white"></div>
      </div>
    </div>
  );
};
