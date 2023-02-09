import { useEffect } from "react";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <main className={`${inter.className} d-flex`}>
      <Component {...pageProps} />
    </main>
  );
}
