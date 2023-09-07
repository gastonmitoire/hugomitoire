"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button, Input } from "@nextui-org/react";

import { chaptersService } from "../_service/chapters.service";

interface ChapterFormProps {
  bookId: string;
}

export const ChapterForm: React.FC<ChapterFormProps> = ({ bookId }) => {
  const router = useRouter();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const orderValue = parseInt(formData.get("order") as string, 10);

    const data = {
      ...Object.fromEntries(formData.entries()),
      order: orderValue,
    };

    chaptersService.create(data);

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <Input
        name="order"
        label="Orden"
        type="number"
        className="min-w-unit-24 flex-1"
      />
      <Input name="title" label="Título" type="text" className="flex-auto" />

      <input type="hidden" name="bookId" value={bookId} />

      <Button type="submit" color="primary">
        Crear capítulo
      </Button>
    </form>
  );
};
