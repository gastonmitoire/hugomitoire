import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ErrorProps } from "next/error";

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

    // Capture the userId field from the form data and verify it exists
    const userId = form.get("userId");

    // Find the 'image' field in the form data
    const imageField = Array.from(form.entries()).find(
      (entry): entry is [string, File] => entry[0] === "image"
    );

    if (!imageField) {
      throw new Error("Image field not found in the form data");
    }

    const [fieldName, imageFile] = imageField;

    // remove spaces from the filename
    const imageName = imageFile.name.replace(/\s/g, "-");

    // Set mimetype and encoding values
    const mimetype = imageFile.type;
    const encoding = "base64"; // Typically used for binary files

    // Format image name with date and time without double points
    const date = new Date();
    const formattedImageName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${imageName}`;

    // Create the image in the database, including userId
    const createdImage = await prisma.image.create({
      data: {
        filename: formattedImageName,
        url: `/images/${formattedImageName}`,
        mimetype,
        encoding,
        userId: userId as string,
      },
    });

    // Convert ArrayBuffer to Buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Write the image file to the public/images folder
    const imageFilePath = path.join(imagePath, formattedImageName);
    await fsPromises.writeFile(imageFilePath, imageBuffer);

    return NextResponse.json(createdImage, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    return new Response("Error processing the form", { status: 500 });
  }
}

export { getImages as GET, createImage as POST };
