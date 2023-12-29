import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

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
  try {
    const data = await request.json();

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    };

    const checkDateISO = (date: string) => {
      return new Date(date).toISOString();
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
        title: "A book with this title already exists",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    data.slug = generateSlug(data.title);
    data.publicationDate = checkDateISO(data.publicationDate);

    const newBook = await prisma.book.create({
      data: data,
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
