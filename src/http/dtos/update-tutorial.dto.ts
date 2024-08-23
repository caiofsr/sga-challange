import { IsString } from 'class-validator';

export class UpdateTutorialBody {
  @IsString()
  title: string;
}
