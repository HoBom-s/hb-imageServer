type Path = 'thumbnail' | 'profile';

export interface OneImageBodyData {
  articlePath: string;
  buffer: Buffer;
  path: Path;
}

export interface UploadOneImage {
  articlePath: string;
  buffer: Buffer;
}

export type MultipleImagesBodyData = OneImageBodyData[];
