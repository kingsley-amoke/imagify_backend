import { Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import * as fs from 'fs/promises';
import { cleanupFile } from 'src/image/helpers/clean-uploads.helper';
import { CompressService } from './services/compress.service';
import { ResizeService } from './services/resize.service';
import { ConvertService } from './services/convert.service';

@Injectable()
export class ImageService {
  constructor(
    private readonly compressService: CompressService,
    private readonly resizeService: ResizeService,
    private readonly convertService: ConvertService,
  ) {}

  async convertFormat(filePath: string, format: string): Promise<Buffer> {
    return this.convertService.convertFormat(filePath, format);
  }

  async resizeImage(
    filePath: string,
    width?: number,
    height?: number,
    maintainAspectRatio: boolean = true,
  ): Promise<Buffer> {
    return this.resizeService.resizeImage(
      filePath,
      width,
      height,
      maintainAspectRatio,
    );
  }

  async compressImage(
    filePath: string,
    quality: number,
    format?: string,
  ): Promise<Buffer> {
    return this.compressService.compressImage(filePath, quality, format);
  }
}
