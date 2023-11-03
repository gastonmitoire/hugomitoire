import React from "react";

import { Image } from "@nextui-org/image";

import { Image as ImageProps } from "@prisma/client";

interface AdminImagesProps {
  images: ImageProps[];
}

export function AdminImages({ images }: AdminImagesProps) {
  return (
    <section className="grid-cols-auto-fill-300 grid gap-5">
      {images.map((image) => (
        <picture key={image.id} className="bg-red-500 p-3">
          <Image
            src={image.url}
            alt={image.filename}
            width={"100%"}
            height={"100%"}
          />
        </picture>
      ))}
    </section>
  );
}
