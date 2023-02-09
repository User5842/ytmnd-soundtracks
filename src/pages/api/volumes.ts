import { ListBucketsCommand, S3ServiceException } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

import { s3Client } from "@/src/clients/s3.client";
import { volumesMap } from "@/src/data/volumes";
import { Volume } from "@/src/interfaces/Volume.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
    let volumes: Array<Partial<Volume>> = [];
    if (Buckets) {
      volumes = Buckets.map((bucket) => ({ ...volumesMap[bucket.Name!] })).sort(
        (volumeOne, volumeTwo) => volumeOne.order - volumeTwo.order
      );
    }
    return res.send(JSON.stringify(volumes));
  } catch (e) {
    if (e instanceof S3ServiceException) {
      return res.status(500).json({ message: e.message, name: e.name });
    }
  }
}
