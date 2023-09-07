import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();

    const createdChapter = await prisma.chapter.create({
      data: {
        title: data.title,
        order: data.order,
        bookId: data.bookId,
      },
    });

    console.log(createdChapter);

    return NextResponse.json(createdChapter, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
