import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTutorialBody {
  @IsString()
  @ApiProperty()
  title: string;
}
