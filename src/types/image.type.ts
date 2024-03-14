type Path = 'thumbnail' | 'profile';

export interface OneImageBodyData {
  uniqueString: string;
  buffer: Buffer;
  path: Path;
  ext: string;
}

export interface UploadOneImage {
  uniqueString: string;
  buffer: Buffer;
  ext: string;
}

export type MultipleImagesBodyData = OneImageBodyData[];
