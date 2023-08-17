import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { url, filename, encoding, mimetype } = await request.json();

  console.log(url, filename, encoding, mimetype);

  //   const image = await prisma.image.create({
  //     data: {
  //       url,
  //       filename,
  //       encoding,
  //       mimetype,
  //     },
  //   });

  //   return NextResponse.json(image);
}
