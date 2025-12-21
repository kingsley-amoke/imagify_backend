import { IsString, IsIn } from 'class-validator';

export class ConvertDto {
  @IsString()
  @IsIn(['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff'])
  format: string;
}
