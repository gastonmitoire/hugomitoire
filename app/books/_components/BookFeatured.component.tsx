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
      <div className="container mx-auto flex p-20">
        <div className="flex max-w-sm flex-auto flex-col justify-end gap-5 p-10 text-right">
          <div className={`${reggaeOne.className} text-5xl`}>{title}</div>
          <div className={`${bellefair.className} text-3xl`}>{description}</div>

          <div>
            <Button color="primary" size="lg">
              Ver libro
            </Button>
          </div>
        </div>
        <div className="flex-0">
          <Image src={coverImageUrl} alt={title} width={500} radius="none" />
        </div>
        <div className={"max-w-md flex-auto p-10"}>{featuredText}</div>
      </div>
    </div>
  );
};
