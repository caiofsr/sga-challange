import { Cache } from 'cache-manager';
import { Tutorial } from 'src/application/entities/tutorial';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ErrorResponse } from 'src/application/types/error-response';
import { SuccessResponse } from 'src/application/types/success-response';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

type UpdateTutorialRequest = {
  id: string;
  title: string;
};

type UpdateTutorialResponse = SuccessResponse<Tutorial> | ErrorResponse;

@Injectable()
export class UpdateTutorialUseCase {
  constructor(
    private readonly tutorialRepository: TutorialRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async execute(request: UpdateTutorialRequest): Promise<UpdateTutorialResponse> {
    const tutorial = await this.tutorialRepository.findById(request.id);

    if (!tutorial) {
      return {
        data: {
          message: 'Tutorial not found',
        },
        status: HttpStatus.NOT_FOUND,
      };
    }

    tutorial.update({ title: request.title });

    await this.tutorialRepository.save(tutorial);

    await this.cacheManager.reset();

    return {
      data: tutorial,
      status: HttpStatus.OK,
    };
  }
}
