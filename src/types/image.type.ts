export interface OneImageBodyData {
  originalname: string;
  buffer: Buffer;
}

export type MultipleImagesBodyData = OneImageBodyData[];
