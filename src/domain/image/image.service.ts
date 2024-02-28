import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  s3 = new AWS.S3();

  getOneImage(id: string) {
    return `Got ${id} image.`;
  }

  async uploadImage(file: Express.Multer.File) {
    const AWS_S3_BUCKET = 'hobom';
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: String(file.originalname),
      Body: file.buffer,
      ACL: 'public-read',
    };

    try {
      const response = await this.s3.upload(params).promise();
      return response;
    } catch (error) {
      throw new Error('Image upload failed.');
    }
  }
  return;
}
