import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";

import volumeOneCoverArt from "../../public/assets/covers/volume-one.jpg";

interface Tracks {
  key: string;
  name: string;
}

export default function Home() {
  const [audioSource, setAudioSource] = useState("");
  const [volume, setVolume] = useState("volume-one");
  const [tracks, setTracks] = useState<Array<Tracks>>([]);

  const volumes = [
    {
      alt: "Sean Connery in Finding Forrester",
      coverArt: volumeOneCoverArt,
      key: "volume-one",
      name: "Volume One",
      release: "October 29, 2005",
      tracks: 20,
    },
  ];

  const trackClicked = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const track = encodeURIComponent(target.dataset.trackKey as string);
    setAudioSource(`https://${volume}.s3.amazonaws.com/${track}`);
  };

  const volumeClicked = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    setVolume(target.dataset.volumeKey as string);
  };

  useEffect(() => {
    fetch(`/api/volumes/${volume}`)
      .then((res) => res.json())
      .then((volumeData) => setTracks(volumeData.tracks))
      .catch(console.error);
  }, [volume]);

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
                  data-volume-key={volume.key}
                  key={volume.key}
                  onClick={volumeClicked}
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
                  data-track-key={track.key}
                  key={track.key}
                  onClick={trackClicked}
                >
                  {track.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="col h-100 overflow-auto">
            <audio autoPlay controls src={audioSource}>
              <a href={audioSource}>Download audio</a>
            </audio>
          </div>
        </div>
      </section>
    </>
  );
}
