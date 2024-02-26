import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  getOneImage(id: string) {
    return `Got ${id} image.`;
  }
}
