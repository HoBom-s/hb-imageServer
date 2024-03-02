import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('thumbnail'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
      region: 'ap-northeast-2',
    });

    const key = `${Date.now()}-${files[0].originalname}`;

    try {
      await new AWS.S3()
        .putObject({
          Key: key,
          Body: files[0].buffer,
          Bucket: process.env.BUCKET_NAME,
        })
        .promise();
    } catch (error) {
      console.error(error);
    }
  }
}
