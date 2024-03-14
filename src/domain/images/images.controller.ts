import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { OneImageBodyData } from 'src/types/image.type';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('single')
  async uploadOneImage(@Body() image: OneImageBodyData) {
    if (!image)
      throw new BadRequestException(
        'Error(ImageServer): Request body missing.',
      );

    let { uniqueString, buffer, path, ext } = image;

    if (path === 'thumbnail') {
      const isSlashIncluded = uniqueString.startsWith('/');
      if (isSlashIncluded) {
        uniqueString = uniqueString.replace('/', '');
      }
    }

    const bucketPath = `${process.env.S3_HBTB_PATH}/${path}`;

    const imageInfo = { uniqueString, buffer, ext };

    return this.imagesService.uploadOneImage(imageInfo, bucketPath);
  }
}
