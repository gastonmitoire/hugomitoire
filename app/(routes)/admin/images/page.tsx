"use client";

import { Image as ImageModel } from "@prisma/client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const data = await response.json();
      setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/images/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setImages((prev) => prev.filter((image) => image.id !== id));
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Imágenes</h2>
      <Spacer y={5} />
      <form action="/api/images" method="POST" encType="multipart/form-data">
        <Input
          type="file"
          name="image"
          label="Imagen"
          placeholder="Imagen"
          size="lg"
          required
        />

        <Spacer y={5} />

        <Button color="primary" type="submit">
          Subir
        </Button>
      </form>
      <Spacer y={5} />
      <div className="grid grid-cols-3 gap-5">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="flex flex-col gap-3">
              <div className="flex justify-center">
                <Image src={image.url} alt={image.filename} className="w-64" />
              </div>
              <div className="flex justify-center">
                <Button
                  color="secondary"
                  onClick={() => handleDelete(image.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 grid place-items-center">
            <Spinner color="secondary" size="lg" label="Cargando imágenes..." />
          </div>
        )}
      </div>
    </div>
  );
}
