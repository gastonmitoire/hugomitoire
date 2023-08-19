import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { role: string } }
) {
  try {
    const { role } = params;

    // Find the user in the database
    const users = await prisma.user.findMany({
      where: { role },
    });

    if (!users) {
      throw new Error(`Users with role ${role} not found`);
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error getting the users", { status: 500 });
  }
}
