import { S3Client } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

export const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
});

export function createImageUrl(key: string) {
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
}
