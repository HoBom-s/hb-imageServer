import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getAllImages(): string {
    return 'Get all images';
  }

  @Get('/:id')
  getOneImage(@Param('id') id: string) {
    return this.imageService.getOneImage(id);
  }

  // WIP: S3 파일 업로
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImage(file);
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
