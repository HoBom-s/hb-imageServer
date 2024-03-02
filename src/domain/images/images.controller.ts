import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { client } from '../../aws/s3.config';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('thumbnail'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    for (const file of files) {
      const key = `${Date.now().toString()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Key: key,
        Body: file.buffer,
        Bucket: process.env.S3_BUCKET_NAME,
      });

      await client.send(command);
    }
  }
}
