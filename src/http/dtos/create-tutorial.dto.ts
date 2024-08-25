import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTutorialBody {
  @IsString()
  @ApiProperty()
  title: string;
}
