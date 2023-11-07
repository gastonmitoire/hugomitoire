export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
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

    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error getting the users", { status: 500 });
  }
}

export { findUser as GET };
