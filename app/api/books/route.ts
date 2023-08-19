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
  const clientURL = new URL(request.nextUrl.toString());

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
    await prisma.book.create({
      data: book,
    });

    return new Response(null, {
      status: 303, // See Other
      headers: {
        Location: clientURL.origin + "/admin/books",
      },
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error creating book", { status: 500 });
  }
}
