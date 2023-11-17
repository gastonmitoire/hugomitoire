import React from "react";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";

import { Cinzel, Reggae_One, Bellefair } from "next/font/google";

import { EnhancedBookModel } from "../_service/books.service";

const cinzel = Cinzel({ subsets: ["latin-ext"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface BookFeaturedProps {
  book: EnhancedBookModel;
  featuredText: React.ReactNode;
}

export const BookFeatured: React.FC<BookFeaturedProps> = ({
  book: { title, description, cover, secondaryImage },
  featuredText,
}) => {
  return (
    <div className="relative z-50 flex min-h-screen w-full items-center justify-center bg-dark">
      <div
        className="absolute left-0 top-0 h-full w-full bg-black opacity-20"
        style={{
          backgroundImage: `url(${secondaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto grid grid-cols-2 gap-5 px-3 py-10 sm:p-20 xl:grid-cols-3 xl:gap-0">
        <div className="order-last col-span-2 flex flex-col justify-end gap-5 text-right sm:p-10 xl:order-none xl:col-span-1">
          <div className={`${reggaeOne.className} text-5xl`}>{title}</div>
          <div className={`${bellefair.className} text-3xl`}>{description}</div>

          <span>
            <Button
              as={Link}
              href="/libros/los-ojos-de-mariel"
              color="primary"
              size="lg"
            >
              Ver libro
            </Button>
          </span>
        </div>

        <div className="col-span-2 grid place-items-center xl:col-span-1">
          <Image src={cover} alt={title} width={500} radius="none" />
        </div>

        <div
          className={
            "order-first col-span-2 sm:p-10 xl:order-none xl:col-span-1"
          }
        >
          {featuredText}
        </div>
      </div>
    </div>
  );
};
