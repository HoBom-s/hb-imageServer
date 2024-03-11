import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesBodyData } from 'src/types/image.type';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get()
  test() {
    return 'test';
  }

  @Post()
  async uploadImages(@Body() images: ImagesBodyData) {
    if (!images || !images.length)
      throw new BadRequestException(
        'Error(ImageServer): Request body missing. Please provide the necessary data in the request body.',
      );
    return this.imagesService.uploadImages(images);
  }

  @Delete()
  removeImage(@Param() id: string) {
    if (!id)
      throw new BadRequestException(
        'Error(ImageServer): Request parameter missing. Please provide the necessary data in the request params.',
      );
    return this.imagesService.removeImage(id);
  }
}
