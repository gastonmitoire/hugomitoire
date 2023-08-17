// new-book page
"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal } from "@nextui-org/modal";
import { Spacer } from "@nextui-org/spacer";

import { Book } from "@prisma/client";

export default function AdminBooksNewPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("title") || !data.get("description") || !data.get("type")) {
      return;
    }

    // const book: Book = {
    //   title: data.get("title") as string,
    //   description: data.get("description") as string,
    //   type: data.get("type") as string,
    // };

    // console.log(book);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Crear libro</h2>
      <Spacer y={5} />
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <div>
          <Input
            size="lg"
            name="title"
            label="Título"
            placeholder="Título"
            required
          />
          <Spacer y={3} />
          <Textarea
            size="lg"
            name="description"
            label="Descripción"
            placeholder="Descripción"
            required
          />
          <Spacer y={3} />
          <Input
            size="lg"
            name="type"
            label="Tipo"
            placeholder="Tipo"
            required
          />
        </div>
        <div>olapue</div>
        <Spacer y={5} />
        <div className="col-span-2 flex justify-end">
          <Button type="submit" color="secondary">
            Crear
          </Button>
        </div>
      </form>
    </div>
  );
}
