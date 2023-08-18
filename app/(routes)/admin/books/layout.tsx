import React from "react";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

export default function AdminBooksLayout(props: {
  children: React.ReactNode;
  new: React.ReactNode;
}) {
  return (
    <main className="container mx-auto">
      <div className="flex justify-end">{props.children}</div>
    </main>
  );
}
