import { HttpStatus, Injectable } from '@nestjs/common';
import { SuccessResponse } from 'src/application/types/success-response';
import { FindAllProps, FindAllResponse, TutorialRepository } from 'src/application/repositories/tutorial.repository';

type IndexTutorialRequest = FindAllProps;

type IndexTutorialResponse = SuccessResponse<FindAllResponse>;

@Injectable()
export class GetAllTutorialsUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({ page = '1', perPage = '10', ...props }: IndexTutorialRequest): Promise<IndexTutorialResponse> {
    const tutorials = await this.tutorialRepository.findAll({ page, perPage, ...props });

    return {
      data: tutorials,
      status: HttpStatus.OK,
    };
  }
}
