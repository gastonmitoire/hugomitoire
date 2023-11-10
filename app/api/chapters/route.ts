import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getChapters(): Promise<NextResponse> {
  try {
    const chapters = await prisma.chapter.findMany();

    return NextResponse.json(chapters, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the chapters",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function createChapter(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json();

    const newChapter = await prisma.chapter.create({
      data: data,
    });

    return NextResponse.json(newChapter, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error creating the chapter",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getChapters as GET, createChapter as POST };
