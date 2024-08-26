import { Response } from 'express';
import { ApiManyQuery } from '../decorators/api-many-query';
import { Tutorial } from 'src/application/entities/tutorial';
import { CreateTutorialBody } from '../dtos/create-tutorial.dto';
import { UpdateTutorialBody } from '../dtos/update-tutorial.dto';
import { manyQueryTutorials } from '../utils/many-query-tutorials';
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard';
import { IndexTutorialQueryDto } from '../dtos/index-tutorial-query.dto';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';
import { DeleteTutorialUseCase } from 'src/application/use-cases/tutorial/delete';
import { GetAllTutorialsUseCase } from 'src/application/use-cases/tutorial/getAll';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Tutorials')
@Controller('tutorials')
@UseGuards(JwtAuthGuard)
@ApiCookieAuth('Authorization')
export class TutorialController {
  constructor(
    private readonly createUseCase: CreateTutorialUseCase,
    private readonly updateUseCase: UpdateTutorialUseCase,
    private readonly deleteUseCase: DeleteTutorialUseCase,
    private readonly findAllUseCase: GetAllTutorialsUseCase,
  ) {}

  @Get()
  @ApiPaginatedResponse(Tutorial)
  @ApiManyQuery(manyQueryTutorials)
  @ApiOperation({ summary: 'Get all tutorials' })
  async getAllTutorials(@Query() query: IndexTutorialQueryDto) {
    const { data } = await this.findAllUseCase.execute(query);

    return data;
  }

  @Post()
  @ApiCreatedResponse({ type: Tutorial })
  @ApiOperation({ summary: 'Create tutorial' })
  @ApiUnprocessableEntityResponse({
    description: 'Tutorial already exists',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'This record already exists',
        },
      },
    },
  })
  async createTutorial(@Body() { title }: CreateTutorialBody, @Res() response: Response) {
    const { data, status } = await this.createUseCase.execute({ title });

    return response.status(status).json(data);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update tutorial' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiNotFoundResponse({
    description: 'Tutorial not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Tutorial not found',
        },
      },
    },
  })
  async updateTutorial(@Param('id') id: string, @Body() body: UpdateTutorialBody, @Res() response: Response) {
    const { data, status } = await this.updateUseCase.execute({ id, ...body });

    return response.status(status).json(data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete tutorial' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiNotFoundResponse({
    description: 'Tutorial not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Tutorial not found',
        },
      },
    },
  })
  async deleteTutorial(@Param('id') id: string, @Res() response: Response) {
    const { status, data } = await this.deleteUseCase.execute({ id });

    return response.status(status).json(data);
  }
}
