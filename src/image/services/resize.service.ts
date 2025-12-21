import { BadRequestException, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { cleanupFile } from '../helpers/clean-uploads.helper';

@Injectable()
export class ResizeService {
  async resizeImage(
    filePath: string,
    width?: number,
    height?: number,
    maintainAspectRatio: boolean = true,
  ): Promise<Buffer> {
    if (!width && !height) {
      throw new BadRequestException(
        'At least one dimension (width or height) must be provided',
      );
    }

    try {
      const image = sharp(filePath);
      const options: sharp.ResizeOptions = {
        fit: maintainAspectRatio ? 'inside' : 'fill',
      };

      const buffer = await image.resize(width, height, options).toBuffer();

      await cleanupFile(filePath);
      return buffer;
    } catch (error) {
      await cleanupFile(filePath);
      throw new BadRequestException(`Error resizing image: ${error.message}`);
    }
  }
}
