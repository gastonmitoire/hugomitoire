import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ErrorProps } from "next/error";
import { File } from "buffer";

import prisma from "@/app/_lib/prisma";

import { promises as fsPromises } from "fs";
import path from "path";
const imagePath = path.join(process.cwd(), "public", "images");

async function getImages() {
  try {
    // Find all images in the database
    const images = await prisma.image.findMany();

    if (!images) {
      throw new Error("Images not found");
    }

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error getting the images", { status: 500 });
  }
}

async function createImage(request: NextRequest): Promise<Response> {
  try {
    const form = await request.formData();
    const userId = form.get("userId");

    const imageFields = form.getAll("images");

    if (!imageFields.length) {
      throw new Error("No image files found in the form data");
    }

    const createdImages = [];

    for (const imageField of imageFields) {
      if (imageField instanceof File) {
        const imageName = imageField.name.replace(/\s/g, "-");
        const mimetype = imageField.type;
        const encoding = "base64";

        const date = new Date();
        const formattedImageName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${imageName}`;

        const createdImage = await prisma.image.create({
          data: {
            filename: formattedImageName,
            url: `${
              process.env.NEXT_PUBLIC_API_URL ?? ""
            }/images/${formattedImageName}`,
            mimetype,
            encoding,
            userId: userId as string,
          },
        });

        const imageBuffer = Buffer.from(await imageField.arrayBuffer());
        const imageFilePath = path.join(imagePath, formattedImageName);
        await fsPromises.writeFile(imageFilePath, imageBuffer);

        createdImages.push(createdImage);
      }
    }

    return NextResponse.json(createdImages, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error processing the form", { status: 500 });
  }
}

export { getImages as GET, createImage as POST };
