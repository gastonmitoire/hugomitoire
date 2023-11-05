"use client";
import React, { useState } from "react";

import { Button, Image, Spacer } from "@nextui-org/react";

import { DropdownZone } from "@/app/_images/_components/DropdownZone";

import { ArchiveBoxXMarkIcon, TrashIcon } from "@heroicons/react/20/solid";

import { Image as ImageModel } from "@prisma/client";
import { imagesService } from "@/app/_images/_service/images.service";

interface AdminImagesProps {
  images: ImageModel[];
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

  const handleDrop = async (files: FileList) => {
    if (files.length > 0) {
      try {
        for (let i = 0; i < files.length; i++) {
          const image = files[i];

          // Crear un objeto FormData para enviar la imagen al servidor
          const formData = new FormData();
          formData.append("images", image);

          // Llamar a tu servicio de creación de imágenes con el FormData
          const createdImage = await imagesService.create(formData);

          if (createdImage) {
            // La imagen se creó exitosamente, puedes realizar alguna acción adicional aquí
            console.log("Imagen creada con éxito:", createdImage);
          }
        }

        // Recargar la página o realizar alguna otra acción necesaria después de crear todas las imágenes
        window.location.reload();
      } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la creación
        console.error("Error al crear la imagen:", error);
      }
    }
  };

  return (
    <DropdownZone onDrop={handleDrop}>
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
                onClick={() => handleOnDelete(image.id)}
                size="sm"
                color="danger"
              >
                <TrashIcon className="h-6 w-6 text-light" />
              </Button>
            </picture>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-white text-opacity-50">
            <span className="flex items-center justify-center gap-3">
              <ArchiveBoxXMarkIcon className="h-6 w-6" />
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
