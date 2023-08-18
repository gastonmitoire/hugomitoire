import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET() {
  const genres = await prisma.genre.findMany();

  return NextResponse.json(genres);
}
