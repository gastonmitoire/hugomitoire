"use client";

import React, { useEffect } from "react";
import "swiper/swiper-bundle.css"; // Asegúrate de importar los estilos de Swiper
import Swiper from "swiper/bundle";

import { Book as BookModel } from "@prisma/client";

import { Image } from "@nextui-org/react";

interface HeroWithSwiperProps {
  books: BookModel[];
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
      <div className="swiper-container h-[700px]">
        <div className="swiper-wrapper">
          {books.map((book) => (
            <div
              key={book.id}
              className="swiper-slide"
              style={{
                backgroundImage: `url(${book.secondaryImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p>olas</p>
              <p>olas2</p>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};
