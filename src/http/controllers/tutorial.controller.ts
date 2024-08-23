import { Body, Controller, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateTutorialBody } from '../dtos/create-tutorial.dto';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';
import { UpdateTutorialBody } from '../dtos/update-tutorial.dto';
import { Response } from 'express';

@Controller('tutorials')
export class TutorialController {
  constructor(
    private readonly createUseCase: CreateTutorialUseCase,
    private readonly updateUseCase: UpdateTutorialUseCase,
  ) {}

  @Post()
  createTutorial(@Body() { title }: CreateTutorialBody) {
    return this.createUseCase.execute({ title });
  }

  @Patch('/:id')
  async updateTutorial(@Param('id') id: string, @Body() body: UpdateTutorialBody, @Res() response: Response) {
    const { data, status } = await this.updateUseCase.execute({ id, ...body });

    return response.status(status).json(data);
  }
}
