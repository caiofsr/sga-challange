import { HttpStatus, Injectable } from '@nestjs/common';
import { Tutorial } from 'src/application/entities/tutorial';
import { SuccessResponse } from 'src/application/types/success-response';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

type CreateTutorialRequest = {
  title: string;
};

type CreateTutorialResponse = SuccessResponse<Tutorial>;

@Injectable()
export class CreateTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({ title }: CreateTutorialRequest): Promise<CreateTutorialResponse> {
    const tutorial = await this.tutorialRepository.save(Tutorial.create({ title }));

    return {
      data: tutorial,
      status: HttpStatus.CREATED,
    };
  }
}
