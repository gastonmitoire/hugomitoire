import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";
import { Book } from "@prisma/client";

async function getBooks(): Promise<NextResponse> {
  try {
    const books = await prisma.book.findMany({
      include: {
        genre: true,
        illustrator: true,
        publisher: true,
        chapters: true,
      },
    });

    return NextResponse.json(books, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the books",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function createBook(request: NextRequest): Promise<NextResponse> {
  type BookRequestProps = Omit<Book, "id" | "slug">;
  try {
    const data = (await request.json()) as BookRequestProps;

    const generateSlug = (title: string) => {
      const withoutAccent = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return withoutAccent
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/--+/g, "-");
    };

    const generatedSlug = generateSlug(data.title);

    const slugExists = await prisma.book.findFirst({
      where: {
        slug: generatedSlug,
      },
    });

    if (slugExists) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Can't duplicate. A book with this title (slug) already exists.",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    data.publicationDate = new Date(data.publicationDate);

    const newBook = await prisma.book.create({
      data: {
        ...data,
        slug: generatedSlug,
      },
    });

    return NextResponse.json(newBook, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error creating the book",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getBooks as GET, createBook as POST };
