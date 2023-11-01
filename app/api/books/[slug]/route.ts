import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getBook(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
): Promise<NextResponse> {
  try {
    const { slug } = params;

    if (!slug) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing book slug",
      };

      return new NextResponse(JSON.stringify(errorResponse), {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const book = await prisma.book.findUnique({
      where: { slug: slug },
      include: {
        genre: true,
        illustrator: true,
        publisher: true,
        chapters: true,
      },
    });

    return new NextResponse(JSON.stringify(book), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the book",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function updateBook(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;

    if (!slug) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing book slug",
      };

      return new NextResponse(JSON.stringify(errorResponse), {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await request.json();

    const updatedBook = await prisma.book.update({
      where: { slug: slug },
      data: data,
    });

    return new NextResponse(JSON.stringify(updatedBook), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error updating the book",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function deleteBook(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
): Promise<NextResponse> {
  try {
    const { slug } = params;

    if (!slug) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing book slug",
      };

      return new NextResponse(JSON.stringify(errorResponse), {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedBook = await prisma.book.delete({
      where: { slug: slug },
    });

    return new NextResponse(JSON.stringify(deletedBook), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error deleting the book",
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getBook as GET, updateBook as PUT, deleteBook as DELETE };
