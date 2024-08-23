import { IsString } from 'class-validator';

export class CreateTutorialBody {
  @IsString()
  title: string;
}
