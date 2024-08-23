import { Response } from 'express';
import { CreateTutorialBody } from '../dtos/create-tutorial.dto';
import { UpdateTutorialBody } from '../dtos/update-tutorial.dto';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';
import { DeleteTutorialUseCase } from 'src/application/use-cases/tutorial/delete';
import { Body, Controller, Delete, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('tutorials')
export class TutorialController {
  constructor(
    private readonly createUseCase: CreateTutorialUseCase,
    private readonly updateUseCase: UpdateTutorialUseCase,
    private readonly deleteUseCase: DeleteTutorialUseCase,
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

  @Delete('/:id')
  async deleteTutorial(@Param('id') id: string, @Res() response: Response) {
    const { status, data } = await this.deleteUseCase.execute({ id });

    return response.status(status).json(data);
  }
}
