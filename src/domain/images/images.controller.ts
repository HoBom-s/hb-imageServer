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

    let { articlePath, buffer, path } = image;
    const bucketPath = `${process.env.S3_HBTB_PATH}/${path}`;

    const isSlashIncluded = articlePath.startsWith('/');
    if (isSlashIncluded) {
      articlePath = articlePath.replace('/', '');
    }

    const imageInfo = { articlePath, buffer };

    return this.imagesService.uploadOneImage(imageInfo, bucketPath);
  }
}
