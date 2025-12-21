import { IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ResizeDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  width?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  height?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  maintainAspectRatio?: boolean = true;
}
