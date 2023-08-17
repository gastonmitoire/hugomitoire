// new-book page
"use client";

import { useState } from "react";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";

import { Book as BookModel } from "@prisma/client";

export default function AdminBooksNewPage() {
  const [error, setError] = useState<Record<string, string>>({});

  console.log(error);

  function validateForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const book: Omit<BookModel, "id"> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      cover: formData.get("cover") as string,
      secondaryImage: formData.get("secondaryImage") as string,
      genreId: formData.get("genreId") as string,
      illustratorId: formData.get("illustratorId") as string,
      publisherId: formData.get("publisherId") as string,
      publicationDate: new Date(formData.get("publicationDate") as string),
    };

    const fieldErrors: Record<string, string> = {};

    Object.keys(book).forEach((key) => {
      if (!book[key as keyof typeof book]) {
        fieldErrors[key] = "Este campo es obligatorio";
      }
    });

    setError(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      // Realizar la acción deseada si el formulario es válido
    }
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Crear libro</h2>
      <Spacer y={5} />
      <form onSubmit={validateForm} className="flex flex-col gap-3">
        <div>aca la portada o algo asi</div>
        <div>
          <Input
            size="lg"
            name="title"
            label="Título"
            placeholder="Título"
            required
            validationState={error.title ? "invalid" : "valid"}
            errorMessage={error.title}
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
          />
        </div>
        <Spacer y={5} />
        <div className="flex justify-end">
          <Button type="submit" color="secondary">
            Crear
          </Button>
        </div>
      </form>
    </div>
  );
}
