export interface Track {
  readonly audio: string;
  readonly exampleLink: string;
  readonly exampleName: string;
  readonly fadLink: string;
  readonly fadName: string;
  readonly name: string;
  readonly order?: number;
}
