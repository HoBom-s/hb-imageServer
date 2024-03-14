import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { client } from 'src/aws/s3.config';
import { CreateObjectKey, UploadOneImageBodyData } from 'src/types/image.type';

@Injectable()
export class ImagesService {
  async uploadOneImage(image: UploadOneImageBodyData) {
    const { buffer, ...restInfo } = image;

    const key = this.createObjectKey(restInfo);
    const imageBuffer = Buffer.from(buffer);

    const uploadCommand = new PutObjectCommand({
      Key: key,
      Body: imageBuffer,
      Bucket: process.env.S3_BUCKET_NAME,
    });

    try {
      await client.send(uploadCommand);
      const imageUrl = this.createImageUrl(key);
      return imageUrl;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async removeOneImage(imageKey: string) {
    const removeCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageKey,
    });

    try {
      return client.send(removeCommand);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  createObjectKey(imageInfo: CreateObjectKey) {
    const { path, uniqueString, ext } = imageInfo;
    return `${process.env.S3_HBTB_PATH}/${path}/${uniqueString}.${ext}`;
  }

  createImageUrl(key: string) {
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  }
}
