import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} d-flex`}>
      <Component {...pageProps} />
    </main>
  );
}
