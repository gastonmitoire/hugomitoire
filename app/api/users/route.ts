import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}
