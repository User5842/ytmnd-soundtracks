import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS as string,
    secretAccessKey: process.env.S3_SECRET as string,
  },
  region: process.env.S3_REGION as string,
});
