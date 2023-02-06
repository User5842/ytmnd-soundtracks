import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${inter.className} d-flex`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
