import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { client, createImageUrl } from 'src/aws/s3.config';

@Injectable()
export class ImagesService {
  async uploadImages(images) {
    const imageUrlArr = [];

    for (const image of images) {
      const key = `${Date.now().toString()}-${image.originalname}`;
      const buffer = Buffer.from(image.buffer, 'utf8');

      const uploadCommand = new PutObjectCommand({
        Key: key,
        Body: buffer,
        Bucket: process.env.S3_BUCKET_NAME,
      });

      await client.send(uploadCommand);

      const imageUrl = createImageUrl(key);
      imageUrlArr.push(imageUrl);
    }

    return { imageUrlArr };
  }
}
