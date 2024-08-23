import { Body, Controller, Post } from '@nestjs/common';
import { CreateTutorialBody } from '../dtos/create-tutorial.dto';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';

@Controller('tutorials')
export class TutorialController {
  constructor(private readonly createUseCase: CreateTutorialUseCase) {}

  @Post()
  createTutorial(@Body() { title }: CreateTutorialBody) {
    return this.createUseCase.execute({ title });
  }
}
