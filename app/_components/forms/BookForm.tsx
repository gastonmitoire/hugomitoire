// new-book page
"use client";

import { useState } from "react";

import { Image as ImageModel } from "@prisma/client";
import { Genre as GenreModel } from "@prisma/client";
import { User as UserModel } from "@prisma/client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Spacer } from "@nextui-org/spacer";

import { ImageCustomRadio } from "@/app/_components/ImageCustomRadio";

interface BookFormProps {
  images: ImageModel[];
  genres: GenreModel[];
  illustrators: UserModel[];
  publishers: UserModel[];
}

interface BookModel {
  title: string;
  slug: string;
  description: string;
  type: string;
  cover: string;
  secondaryImage: string;
  genreId: string;
  illustratorId: string;
  publisherId: string;
  publicationDate: Date;
}

export const BookForm: React.FC<BookFormProps> = ({
  images,
  genres,
  illustrators,
  publishers,
}) => {
  const [error, setError] = useState<Record<string, string>>({});
  const [slug, setSlug] = useState("");

  function validateForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const book: Omit<BookModel, "id"> = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      cover: formData.get("cover") as string,
      secondaryImage: formData.get("secondaryImage") as string,
      genreId: formData.get("genreId") as string,
      illustratorId: formData.get("illustratorId") as string,
      publisherId: formData.get("publisherId") as string,
      publicationDate: new Date(formData.get("publicationDate") as string),
    };

    console.log("book", book);

    const fieldErrors: Record<string, string> = {};

    // Object.keys(book).forEach((key) => {
    //   if (!book[key as keyof typeof book]) {
    //     fieldErrors[key] = "Este campo es obligatorio";
    //   }
    // });

    // setError(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      // Realizar la acción deseada si el formulario es válido
    }
  }

  function handleOnValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setError((prev) => ({ ...prev, [name]: "" }));

    if (!value) {
      setError((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    }
  }

  function generateSlug(title: string) {
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    setSlug(slug);
  }

  return (
    <>
      <div className="grid grid-cols-5">
        <form
          onSubmit={validateForm}
          className="col-start-2 col-end-5 flex flex-col gap-3"
        >
          <RadioGroup
            label="Portada"
            name="cover"
            orientation="horizontal"
            classNames={{
              base: "flex flex-nowrap overflow-x-auto",
              wrapper: "flex flex-nowrap overflow-x-auto",
            }}
          >
            {images.map((image) => (
              <ImageCustomRadio key={image.id} value={image.url}>
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
            classNames={{
              base: "flex flex-nowrap overflow-x-auto",
              wrapper: "flex flex-nowrap overflow-x-auto",
            }}
          >
            {images.map((image) => (
              <ImageCustomRadio key={image.id} value={image.url}>
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
              validationState={error.title ? "invalid" : "valid"}
              errorMessage={error.title}
              onChange={handleOnValueChange}
              onValueChange={generateSlug}
            />
            <Spacer y={3} />
            <Input
              size="lg"
              name="slug"
              label="Slug"
              placeholder="Slug"
              required
              validationState={error.slug ? "invalid" : "valid"}
              errorMessage={error.slug}
              onChange={handleOnValueChange}
              disabled
              value={slug}
            />
            <Spacer y={3} />
            <Textarea
              size="lg"
              name="description"
              label="Descripción"
              placeholder="Descripción"
              required
              validationState={error.description ? "invalid" : "valid"}
              errorMessage={error.description}
              onChange={handleOnValueChange}
            />
            <Spacer y={3} />
            <Input
              size="lg"
              name="type"
              label="Tipo"
              placeholder="Tipo"
              required
              validationState={error.type ? "invalid" : "valid"}
              errorMessage={error.type}
              onChange={handleOnValueChange}
            />
            <Spacer y={3} />

            <RadioGroup label="Género" name="genreId" orientation="horizontal">
              {genres.map((genre) => (
                <Radio key={genre.id} value={genre.id}>
                  {genre.name}
                </Radio>
              ))}
            </RadioGroup>
            <Spacer y={3} />

            <RadioGroup
              label="Ilustrador"
              name="illustratorId"
              orientation="horizontal"
            >
              {illustrators.map((illustrator) => (
                <Radio key={illustrator.id} value={illustrator.id}>
                  {illustrator.username}
                </Radio>
              ))}
            </RadioGroup>
            <Spacer y={3} />

            <RadioGroup
              label="Editorial"
              name="publisherId"
              orientation="horizontal"
            >
              {publishers.map((publisher) => (
                <Radio key={publisher.id} value={publisher.id}>
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
              validationState={error.publicationDate ? "invalid" : "valid"}
              errorMessage={error.publicationDate}
              onChange={handleOnValueChange}
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
