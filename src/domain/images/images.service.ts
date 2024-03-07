import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { client, createImageUrl } from 'src/aws/s3.config';
import { ImagesBodyData } from 'src/types/image.type';

@Injectable()
export class ImagesService {
  async uploadImages(images: ImagesBodyData): Promise<string[]> {
    const imageUrlArr = [];

    for (const image of images) {
      const key = `${Date.now().toString()}-${image.originalname}`;
      const buffer = Buffer.from(image.buffer);

      const uploadCommand = new PutObjectCommand({
        Key: key,
        Body: buffer,
        Bucket: process.env.S3_BUCKET_NAME,
      });

      try {
        await client.send(uploadCommand);
        const imageUrl = createImageUrl(key);
        imageUrlArr.push(imageUrl);
      } catch (error) {
        throw new Error(`Error: ${error}`); // WIP: Error handling
      }
    }

    return imageUrlArr;
  }
}
