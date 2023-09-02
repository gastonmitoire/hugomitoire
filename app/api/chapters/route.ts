import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();

    const createdChapter = await prisma.chapter.create({
      data: {
        title: data.title,
        order: data.order,
        book: {
          connect: {
            id: data.bookId,
          },
        },
      },
    });

    return NextResponse.json(createdChapter, {
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
