import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { config } from 'dotenv';
import { winstonLogger } from './utils/winston.util';

config();

const corsOptions = {
  origin: process.env.HBTB_V2,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
    abortOnError: false,
  });
  const PORT = parseInt(process.env.PORT, 10) || 3000;

  app.enableCors(corsOptions);
  app.use(json({ limit: '50mb' }));

  await app.listen(PORT);
}
bootstrap();
