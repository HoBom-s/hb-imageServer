import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/')
  getAllImages(): string {
    return 'Get all images';
  }

  @Get('/:id')
  getOneImage(@Param('id') id: string) {
    return this.imageService.getOneImage(id);
  }

  @Post('/')
  createImgUrl(): string {
    return 'Create requested image url.';
  }

  @Patch('/:id')
  updateImage(): string {
    return 'Update a image.';
  }

  @Delete('/:id')
  removeImage(): string {
    return 'Delete a image.';
  }
}
