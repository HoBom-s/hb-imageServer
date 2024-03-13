export interface OneImageBodyData {
  originalname: string;
  buffer: Buffer;
  path: string;
}

export type MultipleImagesBodyData = OneImageBodyData[];
