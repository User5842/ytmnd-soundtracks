import { ListObjectsV2Command, S3ServiceException } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

import { s3Client } from "@/src/clients/s3.client";
import { tracksMap } from "@/src/data/tracks";
import { Track } from "@/src/interfaces/Track.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { vid } = req.query;

  try {
    const { Contents } = await s3Client.send(
      new ListObjectsV2Command({ Bucket: vid as string })
    );
    let tracks: Array<Partial<Track>> = [];
    if (Contents) {
      tracks = Contents.map((track) => {
        const trackDisplayName = track.Key!.slice(
          0,
          track.Key!.lastIndexOf(".")
        );

        return {
          audio: `api/tracks/${track.Key!}?vid=${vid as string}`,
          name: trackDisplayName,
          ...tracksMap[trackDisplayName],
        };
      });
    }
    return res.send(JSON.stringify(tracks));
  } catch (e) {
    if (e instanceof S3ServiceException) {
      return res.status(500).json({ message: e.message, name: e.name });
    }
  }
}
