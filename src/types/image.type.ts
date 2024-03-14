type Path = 'thumbnail' | 'profile';

export interface UploadOneImageBodyData {
  uniqueString: string;
  buffer: Buffer;
  path: Path;
  ext: string;
}

export interface CreateObjectKey {
  uniqueString: string;
  path: Path;
  ext: string;
}

export type MultipleImagesBodyData = UploadOneImageBodyData[];
