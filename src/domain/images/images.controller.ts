import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { MultipleImagesBodyData, OneImageBodyData } from 'src/types/image.type';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  async uploadMultipleImages(@Body() images: MultipleImagesBodyData) {
    if (!images || !images.length)
      throw new BadRequestException(
        'Error(ImageServer): Request body missing.',
      );
    return this.imagesService.uploadMultipleImages(images);
  }

  @Post('/thumbnail')
  async uploadThumbnail(@Body() thumbnail: OneImageBodyData) {
    if (!thumbnail)
      throw new BadRequestException(
        'Error(ImageServer): Request body missing.',
      );

    const bucketPath = process.env.S3_HBTB_THUMBNAIL_PATH;
    return this.imagesService.uploadOneImage(thumbnail, bucketPath);
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
