import { IsDateString, IsNumberString, IsString, IsOptional } from 'class-validator';

export class IndexTutorialQueryDto {
  @IsNumberString({ no_symbols: true })
  @IsOptional()
  perPage: string;

  @IsNumberString({ no_symbols: true })
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsDateString()
  @IsOptional()
  createdAt: string;

  @IsDateString()
  @IsOptional()
  updatedAt: string;
}
