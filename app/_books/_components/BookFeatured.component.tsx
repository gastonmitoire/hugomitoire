import React from "react";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";

import { Cinzel, Reggae_One, Bellefair } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin-ext"] });
const bellefair = Bellefair({ weight: "400", subsets: ["latin"] });
const reggaeOne = Reggae_One({ weight: "400", subsets: ["latin"] });

interface BookFeaturedProps {
  title: string;
  description: string;
  coverImageUrl: string;
  featuredText: React.ReactNode;
}

export const BookFeatured: React.FC<BookFeaturedProps> = ({
  title,
  description,
  coverImageUrl,
  featuredText,
}) => {
  return (
    <div className="z-50 flex min-h-screen w-full items-center justify-center bg-dark">
      <div className="container mx-auto grid grid-cols-2 gap-5 px-3 py-10 sm:p-20 xl:grid-cols-3 xl:gap-0">
        <div className="order-last col-span-2 flex flex-col justify-end gap-5 text-right sm:p-10 xl:order-none xl:col-span-1">
          <div className={`${reggaeOne.className} text-5xl`}>{title}</div>
          <div className={`${bellefair.className} text-3xl`}>{description}</div>

          <div>
            <Button color="primary" size="lg">
              Ver libro
            </Button>
          </div>
        </div>

        <div className="col-span-2 grid place-items-center xl:col-span-1">
          <Image src={coverImageUrl} alt={title} width={500} radius="none" />
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
