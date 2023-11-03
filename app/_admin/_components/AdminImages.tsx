"use client";
import React, { useState } from "react";

import { Button, Image } from "@nextui-org/react";

import { Image as ImageProps } from "@prisma/client";

import { ArchiveBoxXMarkIcon, TrashIcon } from "@heroicons/react/20/solid";

import { imagesService } from "@/app/_images/_service/images.service";

interface AdminImagesProps {
  images: ImageProps[];
}

export function AdminImages({ images }: AdminImagesProps) {
  const handleOnDelete = async (id: string) => {
    const confirm = window.confirm(`Seguro que desea eliminar la imagen?`);

    if (!confirm) return;

    const deleted = await imagesService.delete(id);

    if (deleted) {
      window.location.reload();
    }
  };

  return (
    <section className="grid-cols-auto-fill-300 grid gap-5 rounded-3xl border border-light border-opacity-30">
      {images.length > 0 ? (
        images.map((image) => (
          <picture key={image.id} className="relative p-3">
            <Image
              src={image.url}
              alt={image.filename}
              width={"100%"}
              height={"100%"}
            />

            <Button
              isIconOnly
              className="absolute right-0 top-0 z-10"
              onClick={() => handleOnDelete(image.id)}
              size="sm"
              color="danger"
            >
              <TrashIcon className="h-6 w-6 text-light" />
            </Button>
          </picture>
        ))
      ) : (
        <span className="col-span-full flex items-center justify-center gap-3 py-20 text-white text-opacity-50">
          <ArchiveBoxXMarkIcon className="h-6 w-6" />
          Not images found
        </span>
      )}
    </section>
  );
}
