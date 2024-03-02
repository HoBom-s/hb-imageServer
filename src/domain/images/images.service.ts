import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  async uploadImages(files: Express.Multer.File[]) {}
}
