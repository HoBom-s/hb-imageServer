import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { client, createImageUrl } from 'src/aws/s3.config';
import { MultipleImagesBodyData, OneImageBodyData } from 'src/types/image.type';

@Injectable()
export class ImagesService {
  async uploadMultipleImages(
    images: MultipleImagesBodyData,
  ): Promise<string[]> {
    const imageUrlArr = [];

    for (const image of images) {
      const imageUrl = await this.uploadOneImage(image);
      imageUrlArr.push(imageUrl);
    }

    return imageUrlArr;
  }

  async uploadOneImage(image: OneImageBodyData, bucketPath: string) {
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
      return imageUrl;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  // WIP
  removeImage(id: string) {
    return `I'm gonna remove unused images: ${id}`;
  }
}
