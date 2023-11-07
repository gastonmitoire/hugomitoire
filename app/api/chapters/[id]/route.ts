import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getChapter(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing chapter id",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const chapter = await prisma.chapter.findUnique({
      where: { id: id },
      include: {
        book: true,
      },
    });

    return NextResponse.json(chapter, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the chapter",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function updateChapter(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing chapter id",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await request.json();

    const updatedChapter = await prisma.chapter.update({
      where: { id: id },
      data: data,
    });

    return NextResponse.json(updatedChapter, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error updating the chapter",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function deleteChapter(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing chapter id",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedChapter = await prisma.chapter.delete({
      where: { id: id },
    });

    return NextResponse.json(deletedChapter, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error deleting the chapter",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getChapter as GET, updateChapter as PUT, deleteChapter as DELETE };
