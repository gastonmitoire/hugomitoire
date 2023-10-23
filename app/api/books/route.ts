import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getBooks(): Promise<NextResponse> {
  try {
    const books = await prisma.book.findMany();

    return new NextResponse(JSON.stringify(books), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the books",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
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

    data.slug = generateSlug(data.title);
    data.publicationDate = checkDateISO(data.publicationDate);

    const newBook = await prisma.book.create({
      data: data,
    });

    return new NextResponse(JSON.stringify(newBook), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error creating the book",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getBooks as GET, createBook as POST };
