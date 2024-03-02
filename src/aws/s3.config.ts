import { S3Client } from '@aws-sdk/client-s3';

export const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
});
