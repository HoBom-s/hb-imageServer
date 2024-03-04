import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { client, createImageUrl } from 'src/aws/s3.config';

@Injectable()
export class ImagesService {
  async uploadImages(files: Express.Multer.File[]) {
    const imageUrlArr = [];

    for (const file of files) {
      const key = `${Date.now().toString()}-${file.originalname}`;

      const uploadCommand = new PutObjectCommand({
        Key: key,
        Body: file.buffer,
        Bucket: process.env.S3_BUCKET_NAME,
      });

      await client.send(uploadCommand);

      const imageUrl = createImageUrl(key);
      imageUrlArr.push(imageUrl);
    }

    return imageUrlArr;
  }
}
