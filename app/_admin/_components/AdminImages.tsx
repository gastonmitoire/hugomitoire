"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import S3 from "aws-sdk/clients/s3";
import { v4 as uuidv4 } from "uuid";

import { Button, Image, Spacer } from "@nextui-org/react";

import { DropdownZone } from "../../_images/_components/DropdownZone";

import { ArchiveBoxXMarkIcon, TrashIcon } from "@heroicons/react/20/solid";

import { Image as ImageModel } from "@prisma/client";
import { imagesService } from "../../_images/_service/images.service";

import { toast } from "sonner";

interface AdminImagesProps {
  images: ImageModel[];
}

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export function AdminImages({ images }: AdminImagesProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
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
    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

    if (!bucketName) {
      console.error(
        "El nombre del bucket S3 no está configurado correctamente."
      );
      return;
    }

    if (files.length > 0) {
      try {
        for (let i = 0; i < files.length; i++) {
          const image = files[i];

          const fileName = `${uuidv4()}-${image.name}`;

          const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: image,
            ContentType: image.type,
          };

          const uploaded = await s3.upload(params).promise();

          if (!uploaded) {
            console.error("Error al subir la imagen:", fileName);
            toast.error("Error al subir la imagen");
            return;
          }

          console.log("Imagen subida con éxito:", fileName);

          const createdImage = await imagesService.create({
            filename: fileName,
            url: uploaded.Location,
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
                onClick={() => handleDelete(image.id)}
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
