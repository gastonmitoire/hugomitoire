"use client";

import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/image";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EnhancedBookModel } from "../_service/libros.service";

interface BooksSwiperProps {
  slides: Pick<EnhancedBookModel, "id" | "cover" | "title" | "slug">[];
}

export const BooksSwiper: React.FC<BooksSwiperProps> = ({ slides }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const swiper = new Swiper(".swiper-books", {
        modules: [Navigation, Pagination],
        breakpoints: {
          320: {
            slidesPerView: 1.3,
          },
          640: {
            slidesPerView: 2.3,
          },
          768: {
            slidesPerView: 2.3,
          },
          1024: {
            slidesPerView: 3.3,
          },
          1280: {
            slidesPerView: 5.1,
          },
        },
        spaceBetween: 7,
        cssMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }, [mounted]);

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="swiper-books">
        <div className="swiper-wrapper flex items-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="swiper-slide absolute inset-0 h-full w-full"
            >
              <Image src={slide.cover} alt={slide.title} radius="none" />
            </div>
          ))}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
};
