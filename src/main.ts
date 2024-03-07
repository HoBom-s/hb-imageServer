import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const PORT = parseInt(process.env.PORT, 10) || 3000;

  app.use(json({ limit: '50mb' }));
  await app.listen(PORT);
}
bootstrap();
