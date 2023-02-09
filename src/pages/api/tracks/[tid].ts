import { GetObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

import { s3Client } from "@/src/clients/s3.client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tid, vid } = req.query;

  try {
    const { Body } = await s3Client.send(
      new GetObjectCommand({ Bucket: vid as string, Key: tid as string })
    );
    return res.send(Body);
  } catch (e) {
    if (e instanceof S3ServiceException) {
      return res.status(500).json({ message: e.message, name: e.name });
    }
  }
}
