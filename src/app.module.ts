import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './domain/image/image.controller';
import { ImageService } from './domain/image/image.service';
import { ImageModule } from './domain/image/image.module';

@Module({
  imports: [ImageModule],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
