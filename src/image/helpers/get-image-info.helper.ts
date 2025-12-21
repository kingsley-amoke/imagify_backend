import { BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import * as fs from 'fs/promises';

export async function getImageInfo(filePath: string) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const stats = await fs.stat(filePath);

    return {
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
      size: stats.size,
      hasAlpha: metadata.hasAlpha,
    };
  } catch (error) {
    throw new BadRequestException(`Error reading image: ${error.message}`);
  }
}
