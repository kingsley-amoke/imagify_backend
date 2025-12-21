import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CompressService } from './services/compress.service';
import { ResizeService } from './services/resize.service';
import { ConvertService } from './services/convert.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, CompressService, ResizeService, ConvertService],
})
export class ImageModule {}
