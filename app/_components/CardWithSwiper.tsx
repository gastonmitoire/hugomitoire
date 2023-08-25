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
import { Spacer } from "@nextui-org/react";

interface HeroWithSwiperProps {
  books: EnhancedBookModel[];
}

export const CardWithSwiper: React.FC<HeroWithSwiperProps> = ({ books }) => {
  useEffect(() => {
    new Swiper(".swiper-cards-container", {
      speed: 500,
      loop: true,
      cssMode: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      parallax: true,
    });
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <span className="flex items-center gap-5">
        <h3 className="text-2xl font-bold">Libros más populares</h3>
        <Divider className="flex-1 opacity-50" />
      </span>
      <Spacer y={1} />
      <div className="swiper-cards-container">
        <div className="swiper-wrapper">
          {books.map((book) => (
            <div
              key={book.id}
              className="swiper-slide relative overflow-hidden"
            >
              <Image
                src={book.cover}
                alt={book.title}
                height={300}
                width={300}
              />
            </div>
          ))}
        </div>
        <div className="swiper-pagination [&>span]:bg-white"></div>
      </div>
    </div>
  );
};
