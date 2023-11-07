import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getGenre(
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
        title: "Missing genre slug",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genre = await prisma.genre.findUnique({
      where: { slug: slug },
      include: {
        books: true,
      },
    });

    return NextResponse.json(genre, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the genre",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function updateGenre(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;

    if (!slug) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing genre slug",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await request.json();

    const updatedGenre = await prisma.genre.update({
      where: { slug: slug },
      data: data,
    });

    return NextResponse.json(updatedGenre, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error updating the genre",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function deleteGenre(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    const { slug } = params;

    if (!slug) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing genre slug",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedGenre = await prisma.genre.delete({
      where: { slug: slug },
    });

    return NextResponse.json(deletedGenre, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error deleting the genre",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getGenre as GET, updateGenre as PUT, deleteGenre as DELETE };
