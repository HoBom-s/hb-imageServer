import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { client, createImageUrl } from 'src/aws/s3.config';
import { UploadOneImage } from 'src/types/image.type';

@Injectable()
export class ImagesService {
  async uploadOneImage(image: UploadOneImage, path: string) {
    const key = `${path}/${Date.now().toString()}-${image.articlePath}`;
    const buffer = Buffer.from(image.buffer);

    const uploadCommand = new PutObjectCommand({
      Key: key,
      Body: buffer,
      Bucket: process.env.S3_BUCKET_NAME,
    });

    try {
      await client.send(uploadCommand);
      const imageUrl = createImageUrl(key);
      return imageUrl;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
