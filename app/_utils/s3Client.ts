import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const clientParams = {
  region: process.env.NEXT_PUBLIC_AWS_REGION ?? "",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
  },
};

const s3Client = new S3Client(clientParams);

const s3BucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME ?? "";

export const uploadS3File = async (file: File) => {
  const fileKey = `${uuidv4()}-${file.name}`;
  const fileUrl = `https://${s3BucketName}.s3.amazonaws.com/${fileKey}`;

  const uploadParams = {
    Bucket: s3BucketName,
    Key: fileKey,
    Body: file,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return fileUrl;
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteS3File = async (fileUrl: string) => {
  const fileKey = fileUrl.split("/").pop();

  const deleteParams = {
    Bucket: s3BucketName,
    Key: fileKey,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.log("Error", error);
  }
};
