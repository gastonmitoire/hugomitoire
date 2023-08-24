import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

import { Book as BookModel } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params;

    // Get the image from the database
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
        illustrator: true,
        publisher: true,
      },
    });

    return NextResponse.json(book, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error getting book", { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const form = await request.formData();

    // generate book object
    const book: Omit<BookModel, "id"> = {
      title: form.get("title") as string,
      slug: form.get("slug") as string,
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
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error updating book", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params;

    // Delete the image from the database
    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json(deletedBook, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error deleting book", { status: 500 });
  }
}
