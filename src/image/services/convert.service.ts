import { BadRequestException, Injectable } from '@nestjs/common';
import { cleanupFile } from '../helpers/clean-uploads.helper';
import sharp from 'sharp';

@Injectable()
export class ConvertService {
  private readonly supportedFormats = [
    'jpeg',
    'jpg',
    'png',
    'webp',
    'gif',
    'bmp',
    'tiff',
  ];

  async convertFormat(filePath: string, format: string): Promise<Buffer> {
    console.log('path' + filePath);
    const normalizedFormat =
      format.toLowerCase() === 'jpg' ? 'jpeg' : format.toLowerCase();

    if (!this.supportedFormats.includes(normalizedFormat)) {
      throw new BadRequestException(`Unsupported format: ${format}`);
    }

    try {
      const image = sharp(filePath);
      let output: sharp.Sharp;

      switch (normalizedFormat) {
        case 'jpeg':
          output = image.jpeg({ quality: 90 });
          break;
        case 'png':
          output = image.png({ compressionLevel: 6 });
          break;
        case 'webp':
          output = image.webp({ quality: 90 });
          break;
        case 'gif':
          output = image.gif();
          break;
        case 'bmp':
          output = image.toFormat('gif');
          break;
        case 'tiff':
          output = image.tiff();
          break;
        default:
          output = image;
      }

      const buffer = await output.toBuffer();
      await cleanupFile(filePath);
      return buffer;
    } catch (error) {
      console.log(filePath);
      await cleanupFile(filePath);
      throw new BadRequestException(`Error converting image: ${error.message}`);
    }
  }
}
