import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesBodyData } from 'src/types/image.type';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  async uploadImages(@Body() images: ImagesBodyData) {
    if (!images || !images.length)
      throw new BadRequestException(
        'Error(ImageServer): Request body missing. Please provide the necessary data in the request body.',
      );
    return this.imagesService.uploadImages(images);
  }
}
