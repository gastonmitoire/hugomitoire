import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { promises as fsPromises } from "fs";
import path from "path";

import prisma from "@/app/_lib/prisma";
const imagePath = path.join(process.cwd(), "public", "images");

export async function GET() {
  const images = await prisma.image.findMany();

  return NextResponse.json(images);
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const form = await request.formData();

    // Find the 'image' field in the form data
    const imageField = Array.from(form.entries()).find(
      (entry): entry is [string, File] => entry[0] === "image"
    );

    if (!imageField) {
      throw new Error("Image field not found in the form data");
    }

    const [fieldName, imageFile] = imageField;
    const imageName = imageFile.name;

    // Set mimetype and encoding values
    const mimetype = imageFile.type;
    const encoding = "base64"; // Typically used for binary files

    // Create the image in the database
    const createdImage = await prisma.image.create({
      data: {
        filename: imageName,
        url: `/images/${imageName}`,
        mimetype,
        encoding,
      },
    });

    // Convert ArrayBuffer to Buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Write the image file to the public/images folder
    const imageFilePath = path.join(imagePath, imageName);
    await fsPromises.writeFile(imageFilePath, imageBuffer);

    console.log("Image created:", createdImage);

    return NextResponse.json(createdImage);
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error processing the form", { status: 500 });
  }
}
