"use client";

import React, { useEffect } from "react";
import "swiper/swiper-bundle.css"; // Asegúrate de importar los estilos de Swiper
import Swiper from "swiper/bundle";

import { Image } from "@nextui-org/react";

export const HeroWithSwiper: React.FC = () => {
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
          <div
            className="swiper-slide"
            style={{
              backgroundImage: "url(https://picsum.photos/200/300?grayscale)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p>olas</p>
            <p>olas2</p>
          </div>
          <div
            className="swiper-slide"
            style={{
              backgroundImage: "url(https://picsum.photos/200/300?grayscale)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            Slide 2
          </div>
          <div
            className="swiper-slide"
            style={{
              backgroundImage: "url(https://picsum.photos/200/300?grayscale)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            Slide 3
          </div>
          {/* ... Más diapositivas */}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};
