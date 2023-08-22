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

import { EnhancedBookModel } from "../(routes)/admin/books/_service/books.service";

interface HeroWithSwiperProps {
  books: EnhancedBookModel[];
}

export const HeroWithSwiper: React.FC<HeroWithSwiperProps> = ({ books }) => {
  useEffect(() => {
    new Swiper(".swiper-container", {
      speed: 500,
      loop: true,
      cssMode: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // Esto permite hacer clic en los puntos de paginación para cambiar las diapositivas
      },
      simulateTouch: true,
    });
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="swiper-container h-full sm:h-[700px]">
        <div className="swiper-wrapper">
          {books.map((book) => (
            <div
              key={book.id}
              className="swiper-slide relative overflow-hidden"
              style={{
                backgroundImage: `url(${book.secondaryImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="z-10 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

              <div className="container mx-auto py-3 px-3 sm:px-0 flex flex-col items-center sm:flex-row justify-between gap-3 h-full">
                <div className="flex-auto flex flex-col items-center sm:items-start sm:justify-end gap-3 h-full">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    height={400}
                    width={350}
                    radius="none"
                    isBlurred
                  />
                  <span
                    className={`z-10 text-5xl font-bold ${reggaeOne.className}`}
                  >
                    {book.title}
                  </span>
                  <div className="z-10 flex items-center gap-3 w-full text-xl">
                    <span>{book.type}</span>
                    <Divider orientation="vertical" />
                    <span>{book.genre.name}</span>
                    <Divider orientation="vertical" />
                    <span>{book.genre.ageRange}</span>
                  </div>
                </div>

                <div className="z-10 flex-1 sm:self-end flex flex-col gap-3">
                  <p
                    className={`z-10 text-2xl text-center sm:text-left ${bellefair.className}`}
                  >
                    {book.description.length > 200
                      ? book.description.slice(0, 200) + "..."
                      : book.description}
                  </p>
                  <Button
                    as={Link}
                    href={`/libros/${book.title
                      .replaceAll(" ", "-")
                      .toLocaleLowerCase()}`}
                    size="lg"
                    color="primary"
                    variant="ghost"
                    className="uppercase"
                    onClick={() => console.log(book)}
                  >
                    Ver Libro
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};