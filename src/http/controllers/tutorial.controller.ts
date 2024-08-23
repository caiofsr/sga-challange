import { Response } from 'express';
import { CreateTutorialBody } from '../dtos/create-tutorial.dto';
import { UpdateTutorialBody } from '../dtos/update-tutorial.dto';
import { Body, Controller, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';

@Controller('tutorials')
export class TutorialController {
  constructor(
    private readonly createUseCase: CreateTutorialUseCase,
    private readonly updateUseCase: UpdateTutorialUseCase,
  ) {}

  @Post()
  async createTutorial(@Body() { title }: CreateTutorialBody, @Res() response: Response) {
    const { data, status } = await this.createUseCase.execute({ title });

    return response.status(status).json(data);
  }

  @Patch('/:id')
  async updateTutorial(@Param('id') id: string, @Body() body: UpdateTutorialBody, @Res() response: Response) {
    const { data, status } = await this.updateUseCase.execute({ id, ...body });

    return response.status(status).json(data);
  }
}
