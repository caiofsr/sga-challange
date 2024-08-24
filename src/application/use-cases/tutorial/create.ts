import { Cache } from 'cache-manager';
import { Tutorial } from 'src/application/entities/tutorial';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SuccessResponse } from 'src/application/types/success-response';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

type CreateTutorialRequest = {
  title: string;
};

type CreateTutorialResponse = SuccessResponse<Tutorial>;

@Injectable()
export class CreateTutorialUseCase {
  constructor(
    private readonly tutorialRepository: TutorialRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async execute({ title }: CreateTutorialRequest): Promise<CreateTutorialResponse> {
    const tutorial = await this.tutorialRepository.save(Tutorial.create({ title }));

    await this.cacheManager.reset();

    return {
      data: tutorial,
      status: HttpStatus.CREATED,
    };
  }
}
