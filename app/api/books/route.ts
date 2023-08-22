import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/_lib/prisma";

import { Book as BookModel } from "@prisma/client";

export async function GET() {
  const books = await prisma.book.findMany({
    include: {
      genre: true,
    },
  });

  return NextResponse.json(books);
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const form = await request.formData();

    // generate book object
    const book: Omit<BookModel, "id"> = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      cover: form.get("cover") as string,
      secondaryImage: form.get("secondaryImage") as string,
      genreId: form.get("genreId") as string,
      illustratorId: form.get("illustratorId") as string,
      publisherId: form.get("publisherId") as string,
      publicationDate: new Date(form.get("publicationDate") as string),
      type: form.get("type") as string,
    };

    // Create the image in the database
    const createdBook = await prisma.book.create({
      data: book,
    });

    return NextResponse.json(createdBook, {
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error creating book", { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const form = await request.formData();

    // generate book object
    const book: Omit<BookModel, "id"> = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      cover: form.get("cover") as string,
      secondaryImage: form.get("secondaryImage") as string,
      genreId: form.get("genreId") as string,
      illustratorId: form.get("illustratorId") as string,
      publisherId: form.get("publisherId") as string,
      publicationDate: new Date(form.get("publicationDate") as string),
      type: form.get("type") as string,
    };

    // Create the image in the database
    const updatedBook = await prisma.book.update({
      where: {
        id: form.get("id") as string,
      },
      data: book,
    });

    return NextResponse.json(updatedBook, {
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error updating book", { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const form = await request.formData();

    // Create the image in the database
    const deletedBook = await prisma.book.delete({
      where: {
        id: form.get("id") as string,
      },
    });

    return NextResponse.json(deletedBook, {
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error deleting book", { status: 500 });
  }
}
