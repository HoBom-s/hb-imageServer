import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { UploadOneImageBodyData } from 'src/types/image.type';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('single')
  async uploadOneImage(@Body() imageInfo: UploadOneImageBodyData) {
    if (!imageInfo)
      throw new BadRequestException(
        'Error(ImageServer): Request body missing.',
      );

    const { uniqueString, path, ext, buffer } = imageInfo;

    let uniqueStringWithoutSlash: string;
    if (path === 'thumbnail') {
      const isSlashIncluded = uniqueString.startsWith('/');
      if (isSlashIncluded) {
        uniqueStringWithoutSlash = uniqueString.replace('/', '');
      }
    }

    return this.imagesService.uploadOneImage({
      uniqueString: uniqueStringWithoutSlash,
      path,
      ext,
      buffer,
    });
  }

  @Post('remove')
  removeOneImage(@Body('imageKey') imageKey: string) {
    return this.imagesService.removeOneImage(imageKey);
  }
}
