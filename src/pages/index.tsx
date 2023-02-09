import React, { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import Head from "next/head";
import Image from "next/image";

import { Track } from "../interfaces/Track.interface";
import { Volume } from "../interfaces/Volume.interface";

export default function Home() {
  const [track, setTrack] = useState<Track>();
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [volume, setVolume] = useState("volume-one");
  const [volumes, setVolumes] = useState<Array<Volume>>([]);

  useEffect(() => {
    fetch(`/api/volume/${volume}`)
      .then((res) => res.json())
      .then(setTracks)
      .catch(console.error);
  }, [volume]);

  useEffect(() => {
    fetch(`/api/volumes`)
      .then((res) => res.json())
      .then(setVolumes)
      .catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>YTMND Soundtracks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container m-auto">
        <header>
          <h1>YTMND Soundtracks</h1>
          <p>
            A compilation of musical recordings used in fads and popular pages
            on the YTMND web site.
          </p>
          <p>
            Additional information can be found on the official{" "}
            <a
              href="https://wiki.ytmnd.com/YTMND_Soundtrack"
              rel="noopener noreferrer"
              target="_blank"
            >
              YTMND Soundtrack wiki.
            </a>
          </p>
        </header>
        <div className="row align-items-start" style={{ height: 500 }}>
          <div className="col h-100 overflow-auto">
            <ListGroup>
              {volumes.map((volume) => (
                <ListGroup.Item
                  action
                  className="d-flex justify-content-between align-items-start"
                  key={volume.key}
                  onClick={() => setVolume(volume.key)}
                >
                  <Image
                    alt={volume.alt}
                    src={volume.coverArt}
                    height={48}
                    width={48}
                  />
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{volume.name}</div>
                    <time>{volume.release}</time>
                  </div>
                  <Badge bg="primary" pill>
                    {volume.tracks}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="col h-100 overflow-auto">
            <ListGroup as="ol" numbered>
              {tracks.map((track) => (
                <ListGroup.Item
                  action
                  key={track.name}
                  onClick={() => setTrack(track)}
                >
                  {track.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="col h-100 d-flex flex-column gap-3">
            <iframe
              allowFullScreen
              className="container-fluid flex-grow-1"
              scrolling="no"
              src={track?.exampleLink}
              title={track?.exampleName}
            ></iframe>
            <div>
              <p>
                <mark>Fad</mark> {track?.fadName}
              </p>
              <p>
                <mark>Example</mark> {track?.exampleName}
              </p>
              <audio controls src={track?.audio}>
                <a href={track?.audio}>Download audio</a>
              </audio>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
