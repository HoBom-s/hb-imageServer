import { Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  async uploadImages(@Body() images) {
    return this.imagesService.uploadImages(images);
  }
}
