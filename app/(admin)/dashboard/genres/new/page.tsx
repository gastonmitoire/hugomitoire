import React from "react";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

type NewGenre = {
  name: string;
  nameSlug: string;
  ageRange: string;
};

export default function AdminGenresNewPage() {
  return (
    <main className="container mx-auto">
      <Divider className="my-5 w-1/2 mx-auto" />
      <h1 className="text-3xl font-bold text-center">Crear género</h1>
      <Divider className="my-5 w-1/2 mx-auto" />
      <div className="grid grid-cols-5">
        <form className="col-start-2 col-end-5 flex flex-col gap-3">
          <Input label="Nombre" placeholder="Nombre" required />
          <Input label="Rango de edad" placeholder="Rango de edad" required />
          <Button className="btn btn-primary">Crear</Button>
        </form>
      </div>
    </main>
  );
}
