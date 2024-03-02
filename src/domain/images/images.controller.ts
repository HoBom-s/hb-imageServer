import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
// import * as AWS from 'aws-sdk';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('thumbnail'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
      region: process.env.S3_REGION,
    });

    const key = `${Date.now().toString()}-${files[0].originalname}`;

    const command = new PutObjectCommand({
      Key: key,
      Body: files[0].buffer,
      Bucket: process.env.S3_BUCKET_NAME,
    });

    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    /*
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
      region: process.env.S3_REGION,
    });

  
    const s3 = new AWS.S3();

    try {
      s3.putObject({
        Key: key,
        Body: files[0].buffer,
        Bucket: process.env.S3_BUCKET_NAME,
      }).promise();
    } catch (error) {
      console.error(error);
    }
    */
  }
}
