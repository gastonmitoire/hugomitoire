import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import prisma from "@/app/_lib/prisma";

async function getUsers(): Promise<Response> {
  try {
    const users = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error getting the users",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function createUser(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        passwordHash: data.passwordHash,
        email: data.email,
        role: data.role,
      },
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error creating the user",
    };

    return new Response(JSON.stringify(errorResponse), {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getUsers as GET, createUser as POST };
