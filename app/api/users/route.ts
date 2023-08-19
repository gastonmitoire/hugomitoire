import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error getting the users", { status: 500 });
  }
}
