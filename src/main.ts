import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  app.enableCors({
    origin: process.env.HBTB_V2,
  });
  app.use(json({ limit: '50mb' }));
  await app.listen(PORT);
}
bootstrap();
