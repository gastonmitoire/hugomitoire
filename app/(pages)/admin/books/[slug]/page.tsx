import React from "react";

import { AdminBook } from "@/app/_admin/_components/AdminBook.component";

import { booksService } from "@/app/_books/_service/books.service";
interface AdminBookPageProps {
  params: {
    slug: string;
  };
}

export default async function AdminBookPage({ params }: AdminBookPageProps) {
  const { slug } = params;

  const book = await booksService.getBySlug(slug);
  return (
    <main>
      <AdminBook book={book} />
    </main>
  );
}
