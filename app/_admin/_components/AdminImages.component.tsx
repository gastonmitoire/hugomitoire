"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Image, Spacer } from "@nextui-org/react";

import { DropdownZone } from "../../_image/_components/DropdownZone.component";

import { GallerySlash, Trash } from "iconsax-react";

import { Image as ImageModel } from "@prisma/client";
import { imagesService } from "../../_image/_service/images.service";

import { toast } from "sonner";

interface AdminImagesProps {
  images: ImageModel[];
}

export function AdminImages({ images }: AdminImagesProps) {
  const router = useRouter();

  const handleDelete = async (id: string, url: string) => {
    try {
      const confirm = window.confirm(`Seguro que desea eliminar la imagen?`);

      if (!confirm) return;

      const deleted = await imagesService.delete(id);

      if (deleted) {
        router.refresh();

        toast.success("Imagen eliminada con éxito", { duration: 3000 });
      }
    } catch (error: any | unknown) {
      router.refresh();
      toast.error(error.title);
    }
  };

  const handleDrop = async (files: FileList) => {
    if (files.length > 0) {
      try {
        for (let i = 0; i < files.length; i++) {
          const image = files[i];

          const uploadedUrl = image.name as string;

          if (!uploadedUrl) {
            toast.error("Error al subir la imagen");
            return;
          }

          const createdImage = await imagesService.create({
            filename: image.name,
            url: uploadedUrl,
            encoding: image.type,
            mimetype: image.type,
            userId: null,
          });

          if (createdImage) {
            console.log("Imagen creada con éxito:", createdImage);
          }
        }

        window.location.reload();

        toast.success(`${files.length} imágenes creadas con éxito`, {
          duration: 3000,
        });
      } catch (error) {
        console.error("Error al crear la imagen:", error);
        toast.error("Error al crear la imagen");
      }
    }
  };

  return (
    <DropdownZone onDrop={handleDrop} multiple>
      <section className="grid grid-cols-auto-fill-300 gap-5 rounded-3xl border border-light border-opacity-30">
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
                onClick={() => handleDelete(image.id, image.url)}
                size="sm"
                color="danger"
              >
                <Trash className="h-6 w-6 text-light" />
              </Button>
            </picture>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-white text-opacity-50">
            <span className="flex items-center justify-center gap-3">
              <GallerySlash className="h-6 w-6" />
              Not images found
            </span>

            <Spacer y={5} />

            <span className="text-xl font-bold text-lighter text-opacity-30">
              Drop images here
            </span>
          </div>
        )}
      </section>
    </DropdownZone>
  );
}
