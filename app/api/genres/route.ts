import { NextResponse, NextRequest } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getGenres(): Promise<Response> {
  try {
    const genres = await prisma.genre.findMany();

    return new NextResponse(JSON.stringify(genres), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the genres",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function createGenre(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();

    const generateSlug = (name: string) => {
      return name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    };

    data.slug = generateSlug(data.name);

    const newGenre = await prisma.genre.create({
      data: data,
    });

    return new Response(JSON.stringify(newGenre), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error creating the genre",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getGenres as GET, createGenre as POST };
