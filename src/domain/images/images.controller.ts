import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('thumbnail'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.imagesService.uploadImages(files);
  }
}
