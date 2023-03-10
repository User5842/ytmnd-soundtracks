import { StaticImageData } from "next/image";

export interface Volume {
  readonly alt: string;
  readonly coverArt: StaticImageData;
  readonly key: string;
  readonly name: string;
  readonly order: number;
  readonly release: string;
  readonly tracks: number;
}
