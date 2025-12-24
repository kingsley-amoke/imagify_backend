import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ImageService } from './image.service';
import { ConvertDto } from './dto/convert.dto';
import { ResizeDto } from './dto/resize.dto';
import { CompressDto } from './dto/compress.dto';

import { imageUploadOptions } from 'src/image/helpers/upload.helper';
import { getContentType } from 'src/image/helpers/get-content-type.helper';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async checkConnection() {
    console.log('Connection verified');
    return 'Hello World';
  }

  @Post('convert')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async convertImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() convertDto: ConvertDto,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('No image file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      console.log(file);
      const buffer = await this.imageService.convertFormat(
        file.path,
        convertDto.format,
      );

      const contentType = getContentType(convertDto.format);
      const filename = `converted.${
        convertDto.format === 'jpg' ? 'jpeg' : convertDto.format
      }`;

      res.setHeader('Content-Type', contentType);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.send(buffer);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error converting image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('resize')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async resizeImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() resizeDto: ResizeDto,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('No image file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const buffer = await this.imageService.resizeImage(
        file.path,
        resizeDto.width,
        resizeDto.height,
        resizeDto.maintainAspectRatio,
      );

      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="resized.jpg"',
      );
      res.send(buffer);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error resizing image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('compress')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async compressImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() compressDto: CompressDto,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('No image file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const buffer = await this.imageService.compressImage(
        file.path,
        compressDto.quality,
        compressDto.format,
      );

      const format = compressDto.format || 'jpeg';
      const contentType = getContentType(format);
      const filename = `compressed.${format === 'jpg' ? 'jpeg' : format}`;

      res.setHeader('Content-Type', contentType);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.send(buffer);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error compressing image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
