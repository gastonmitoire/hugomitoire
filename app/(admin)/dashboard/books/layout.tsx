import React from "react";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export default function AdminBooksLayout(props: {
  children: React.ReactNode;
  new: React.ReactNode;
}) {
  return (
    <main className="container mx-auto pt-5">
      <div className="flex justify-end gap-3">
        <Button as={Link} color="secondary" href="/dashboard/books/new">
          Crear libro
        </Button>
        <Button as={Link} color="secondary" href="/dashboard/genres/new">
          Crear género
        </Button>
      </div>
      <Divider className="my-3" />
      {props.children}
    </main>
  );
}
