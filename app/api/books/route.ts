import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/_lib/prisma";

import { Book as BookModel } from "@prisma/client";

export async function GET() {
  const books = await prisma.book.findMany({
    include: {
      genre: true,
      illustrator: true,
      publisher: true,
    },
  });

  return NextResponse.json(books);
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();

    // Create the image in the database
    const createdBook = await prisma.book.create({
      data: {
        title: data.title,
        description: data.description,
        cover: data.cover,
        secondaryImage: data.secondaryImage,
        slug: data.slug,
        type: data.type,
        publicationDate: data.publicationDate,
        genre: {
          connect: {
            id: data.genreId,
          },
        },
        illustrator: {
          connect: {
            id: data.illustratorId,
          },
        },
        publisher: {
          connect: {
            id: data.publisherId,
          },
        },
      },
    });

    return NextResponse.json(createdBook, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
