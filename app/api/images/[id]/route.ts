import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { promises as fsPromises } from "fs";
import path from "path";

import prisma from "@/app/_lib/prisma";
const imagePath = path.join(process.cwd(), "public", "images");

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const clientURL = new URL(request.nextUrl.toString());

  try {
    const { id } = params;

    // Find the image in the database
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      throw new Error(`Image with id ${id} not found`);
    }

    // Delete the image from the database
    await prisma.image.delete({
      where: { id },
    });

    // Delete the image file from the public/images folder
    const imageFilePath = path.join(imagePath, image.filename);
    await fsPromises.unlink(imageFilePath);

    return NextResponse.redirect(clientURL.origin + "/admin/images");
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error deleting the image", { status: 500 });
  }
}
