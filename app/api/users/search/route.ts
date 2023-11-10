export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function findUser(request: NextRequest): Promise<Response> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return new Response("No query provided", { status: 400 });
    }

    console.log("query", query);
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            id: {
              equals: query,
            },
          },
          {
            username: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
        ],
      },
    });

    return NextResponse.json(users, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error finding the user",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { findUser as GET };
