import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import { Image as ImageModel } from "@prisma/client";

import prisma from "@/app/_lib/prisma";

async function getImages() {
  try {
    // Find all images in the database
    const images = await prisma.image.findMany();

    if (!images) {
      throw new Error("Images not found");
    }

    return NextResponse.json(images, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorProps: ErrorProps = {
      statusCode: 500,
      title: "Internal Server Error",
    };

    return NextResponse.json(errorProps, {
      status: errorProps.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function createImage(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();

    const image = await prisma.image.create({
      data: {
        url: data.url,
        encoding: data.encoding,
        filename: data.filename,
        mimetype: data.mimetype,
        fanarts: data.fanarts,
        userId: data.userId,
      },
    });

    return NextResponse.json(image, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorProps: ErrorProps = {
      statusCode: 500,
      title: "Internal Server Error",
    };

    return NextResponse.json(errorProps, {
      status: errorProps.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { getImages as GET, createImage as POST };
