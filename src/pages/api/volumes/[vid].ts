import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { vid } = req.query;

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS as string,
      secretAccessKey: process.env.S3_SECRET as string,
    },
    region: process.env.S3_REGION as string,
  });

  s3Client
    .send(new ListObjectsV2Command({ Bucket: vid as string }))
    .then((response) => response.Contents?.map((content) => content.Key))
    .then((trackKeys) =>
      trackKeys?.map((track) => ({
        key: track,
        name: track?.substring(0, track.indexOf(".")),
      }))
    )
    .then((tracks) => res.json({ tracks }))
    .catch(console.error);
}
