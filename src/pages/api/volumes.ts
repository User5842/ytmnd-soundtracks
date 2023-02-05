import type { NextApiRequest, NextApiResponse } from "next";

import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS as string,
      secretAccessKey: process.env.S3_SECRET as string,
    },
    region: process.env.S3_REGION as string,
  });

  s3Client
    .send(new ListBucketsCommand({}))
    .then((response) => response.Buckets?.map((bucket) => bucket.Name))
    .then((normalizedBucketNames) =>
      res.json({ buckets: normalizedBucketNames })
    )
    .catch(console.error);
}
