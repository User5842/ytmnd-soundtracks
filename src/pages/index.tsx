import Head from "next/head";

export default function Home() {
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
            A compilation musical recordings used in fads and popular pages on
            the YTMND web site.
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
      </section>
    </>
  );
}
