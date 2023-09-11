import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

import { Book as BookModel } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<Response> {
  try {
    const { slug } = params;

    // Get the image from the database
    const book = await prisma.book.findUnique({
      where: { slug },
      include: {
        genre: true,
        illustrator: true,
        publisher: true,
        chapters: {
          include: {
            text: true,
          },
        },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<Response> {
  try {
    const { slug } = params;

    // Delete the image from the database
    const deletedBook = await prisma.book.delete({
      where: { slug },
    });

    return NextResponse.json(deletedBook, {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error deleting book", { status: 500 });
  }
}
