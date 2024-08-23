import { HttpStatus, Injectable } from '@nestjs/common';
import { Tutorial } from 'src/application/entities/tutorial';
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
  constructor(private readonly tutorialRepository: TutorialRepository) {}

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

    return {
      data: tutorial,
      status: HttpStatus.OK,
    };
  }
}
