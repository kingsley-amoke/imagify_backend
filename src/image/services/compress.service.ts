import { BadRequestException, Injectable } from '@nestjs/common';
import { cleanupFile } from '../helpers/clean-uploads.helper';
import sharp from 'sharp';

@Injectable()
export class CompressService {
  private highestQuality: number = 83;
  async compressImage(
    filePath: string,
    quality: number,
    format?: string,
  ): Promise<Buffer> {
    if (quality < 1 || quality > 100) {
      throw new BadRequestException('Quality must be between 1 and 100');
    }

    if (quality > this.highestQuality) {
      quality = this.highestQuality;
    }

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      const outputFormat = format?.toLowerCase() || metadata.format || 'jpeg';
      const normalizedFormat = outputFormat === 'jpg' ? 'jpeg' : outputFormat;

      let output: sharp.Sharp;

      switch (normalizedFormat) {
        case 'jpeg':
          output = image.jpeg({ quality });
          break;
        case 'png':
          const pngCompressionLevel = Math.round(9 - (quality / 100) * 9);
          output = image.png({
            compressionLevel: pngCompressionLevel,
            quality, // Also set quality for better results
          });
          // const pngQuality = Math.round((quality / 100) * 9);
          // output = image.png({ compressionLevel: 9 - pngQuality });
          break;
        case 'webp':
          output = image.webp({ quality });
          break;
        default:
          output = image.jpeg({ quality });
      }

      const buffer = await output.toBuffer();
      await cleanupFile(filePath);
      return buffer;
    } catch (error) {
      await cleanupFile(filePath);
      throw new BadRequestException(
        `Error compressing image: ${error.message}`,
      );
    }
  }
}
