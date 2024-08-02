"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { EnhancedBookModel } from "../_service/books.service";
import { Image } from "@nextui-org/react";

import { Cinzel, Bellefair, Reggae_One } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface BooksSwiperProps {
  books: EnhancedBookModel[];
}

export const BooksSwiper: React.FC<BooksSwiperProps> = ({ books }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="mySwiper h-screen w-full"
    >
      {books.map(({ title, cover, secondaryImage }, index) => (
        <SwiperSlide
          key={index}
          className="relative"
          style={{
            backgroundImage: `url(${secondaryImage.replaceAll("png", "jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute z-0 h-full w-full bg-darker bg-opacity-90" />
          <div className="grid h-full w-full place-items-center">
            <div className="relative z-10 flex w-full max-w-5xl justify-center gap-5 px-10 py-10">
              <Image src={cover} alt={`tapa-libro_${title}`} />

              <div className="absolute z-10 flex flex-col bg-darker bg-opacity-80 p-5">
                <h3 className={`text-5xl ${reggaeOne.className}`}>{title}</h3>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
