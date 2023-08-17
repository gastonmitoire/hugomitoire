"use client";

import React, { useEffect, useState } from "react";

import { Image as ImageModel } from "@prisma/client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Progress } from "@nextui-org/progress";
import { Spacer } from "@nextui-org/spacer";

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
    setIsDeleting(true);
    const response = await fetch(`/api/images/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setImages((prev) => prev.filter((image) => image.id !== id));
      setIsDeleting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsFormValid(true);
      setPreviewImage(URL.createObjectURL(file)); // Crear URL para la vista previa
    } else {
      setIsFormValid(false);
      setPreviewImage(null);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Imágenes</h2>
      <Spacer y={5} />
      <form
        action="/api/images"
        method="POST"
        encType="multipart/form-data"
        className="flex items-center gap-3"
      >
        {previewImage && (
          <div className="flex justify-center">
            <img src={previewImage} alt="Preview" className="w-64" />
          </div>
        )}
        <Input
          type="file"
          name="image"
          label="Imagen"
          placeholder="Imagen"
          size="lg"
          required
          onChange={handleInputChange}
        />

        <Spacer y={5} />

        <Button
          color={isFormValid ? "primary" : "default"}
          type="submit"
          disabled={!isFormValid}
        >
          Subir
        </Button>
      </form>

      <Divider className="my-5" />

      <div className="grid grid-cols-3 gap-5">
        {loading && (
          <div className="col-span-3">
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Loading..."
              color="default"
            />
          </div>
        )}
        {images.map((image) => (
          <div key={image.id} className="flex flex-col gap-3">
            <Image src={image.url} alt={image.filename} />
            <Button
              color="danger"
              onClick={() => handleDelete(image.id)}
              isLoading={isDeleting || loading}
            >
              Eliminar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
