"use client";

import React, { useState } from "react";
import { Image as ImageModel } from "@prisma/client";
import { Genre as GenreModel } from "@prisma/client";
import { User as UserModel } from "@prisma/client";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Spacer } from "@nextui-org/spacer";

import { ImageCustomRadio } from "@/app/_components/ImageCustomRadio";

import { booksService } from "@/app/(admin)/dashboard/books/_service/books.service";

interface BookFormProps {
  images: ImageModel[];
  genres: GenreModel[];
  illustrators: UserModel[];
  publishers: UserModel[];
}

interface NewBookModel {
  title: string;
  slug: string;
  description: string;
  type: string;
  cover: string;
  secondaryImage: string;
  genreId: string;
  illustratorId: string;
  publisherId: string;
  publicationDate: string; // Cambiado a string para mantener el formato original
}

export const BookForm: React.FC<BookFormProps> = ({
  images,
  genres,
  illustrators,
  publishers,
}) => {
  const [formData, setFormData] = useState<NewBookModel>({
    title: "",
    slug: "",
    description: "",
    type: "",
    cover: "",
    secondaryImage: "",
    genreId: "",
    illustratorId: "",
    publisherId: "",
    publicationDate: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBook: NewBookModel = {
      ...formData,
      slug: formData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      publicationDate: new Date(formData.publicationDate).toISOString(), // Convertir a formato ISO
    };

    const response = await booksService.create(newBook);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="grid grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="col-start-2 col-end-5 flex flex-col gap-3"
        >
          <RadioGroup
            label="Portada"
            name="cover"
            orientation="horizontal"
            isRequired
            classNames={{
              base: "flex flex-nowrap overflow-x-auto",
              wrapper: "flex flex-nowrap overflow-x-auto",
            }}
          >
            {images.map((image) => (
              <ImageCustomRadio
                key={image.id}
                value={image.url}
                checked={formData.cover === image.url}
                onChange={() => handleRadioChange("cover", image.url)}
              >
                <Image
                  src={image.url}
                  width={300}
                  height={400}
                  alt={image.filename}
                  radius="none"
                />
              </ImageCustomRadio>
            ))}
          </RadioGroup>
          <RadioGroup
            label="Imagen secundaria"
            name="secondaryImage"
            orientation="horizontal"
            isRequired
            classNames={{
              base: "flex flex-nowrap overflow-x-auto",
              wrapper: "flex flex-nowrap overflow-x-auto",
            }}
          >
            {images.map((image) => (
              <ImageCustomRadio
                key={image.id}
                value={image.url}
                checked={formData.secondaryImage === image.url}
                onChange={() => handleRadioChange("secondaryImage", image.url)}
              >
                <Image
                  src={image.url}
                  width={300}
                  height={400}
                  alt={image.filename}
                  radius="none"
                />
              </ImageCustomRadio>
            ))}
          </RadioGroup>
          <div>
            <Input
              size="lg"
              name="title"
              label="Título"
              placeholder="Título"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
            <Spacer y={3} />
            <Textarea
              size="lg"
              name="description"
              label="Descripción"
              placeholder="Descripción"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
            <Spacer y={3} />
            <Input
              size="lg"
              name="type"
              label="Tipo"
              placeholder="Tipo"
              required
              value={formData.type}
              onChange={handleInputChange}
            />
            <Spacer y={3} />

            <RadioGroup
              label="Género"
              name="genreId"
              isRequired
              orientation="horizontal"
            >
              {genres.map((genre) => (
                <Radio
                  key={genre.id}
                  value={genre.id}
                  checked={formData.genreId === genre.id}
                  onChange={() => handleRadioChange("genreId", genre.id)}
                >
                  {genre.name}
                </Radio>
              ))}
            </RadioGroup>
            <Spacer y={3} />

            <RadioGroup
              label="Ilustrador"
              name="illustratorId"
              isRequired
              orientation="horizontal"
            >
              {illustrators.map((illustrator) => (
                <Radio
                  key={illustrator.id}
                  value={illustrator.id}
                  checked={formData.illustratorId === illustrator.id}
                  onChange={() =>
                    handleRadioChange("illustratorId", illustrator.id)
                  }
                >
                  {illustrator.username}
                </Radio>
              ))}
            </RadioGroup>
            <Spacer y={3} />

            <RadioGroup
              label="Editorial"
              name="publisherId"
              isRequired
              orientation="horizontal"
            >
              {publishers.map((publisher) => (
                <Radio
                  key={publisher.id}
                  value={publisher.id}
                  checked={formData.publisherId === publisher.id}
                  onChange={() =>
                    handleRadioChange("publisherId", publisher.id)
                  }
                >
                  {publisher.username}
                </Radio>
              ))}
            </RadioGroup>
            <Spacer y={3} />

            <Input
              size="lg"
              name="publicationDate"
              label="Fecha de publicación"
              placeholder="Fecha de publicación"
              required
              value={formData.publicationDate}
              onChange={handleInputChange}
            />
            <Spacer y={3} />
          </div>
          <Spacer y={5} />

          <div className="flex justify-end">
            <Button type="submit" color="secondary">
              Crear
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
