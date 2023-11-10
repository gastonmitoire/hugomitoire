import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import { promises as fsPromises } from "fs";
import path from "path";

import prisma from "@/app/_lib/prisma";
const imagePath = path.join(process.cwd(), "public", "images");

async function deleteImage(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: ErrorProps = {
        statusCode: 400,
        title: "Missing image id",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find the image in the database
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      const errorResponse: ErrorProps = {
        statusCode: 404,
        title: "Image not found",
      };

      return NextResponse.json(errorResponse, {
        status: errorResponse.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the image from the database
    await prisma.image.delete({
      where: { id },
    });

    // Delete the image file from the public/images folder
    const imageFilePath = path.join(imagePath, image.filename);
    await fsPromises.unlink(imageFilePath);

    return NextResponse.json(image, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse: ErrorProps = {
      statusCode: 500,
      title: "Error deleting the image",
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { deleteImage as DELETE };
