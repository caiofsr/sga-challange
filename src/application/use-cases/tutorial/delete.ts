import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponse } from 'src/application/types/error-response';
import { SuccessResponse } from 'src/application/types/success-response';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

type DeleteTutorialRequest = {
  id: string;
};

type DeleteTutorialResponse = SuccessResponse<undefined> | ErrorResponse;

@Injectable()
export class DeleteTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute(request: DeleteTutorialRequest): Promise<DeleteTutorialResponse> {
    const tutorial = await this.tutorialRepository.findById(request.id);

    if (!tutorial) {
      return {
        data: {
          message: 'Tutorial not found',
        },
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.tutorialRepository.delete(tutorial);

    return {
      status: HttpStatus.NO_CONTENT,
      data: undefined,
    };
  }
}
