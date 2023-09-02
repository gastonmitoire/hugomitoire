"use client";
import React from "react";

import { Button, Input } from "@nextui-org/react";

interface ChapterFormProps {
  bookId: string;
}

export const ChapterForm: React.FC<ChapterFormProps> = ({ bookId }) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // send data to server as json

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData.entries());

    console.log(data);
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
