import { Cache } from 'cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SuccessResponse } from 'src/application/types/success-response';
import { FindAllProps, FindAllResponse, TutorialRepository } from 'src/application/repositories/tutorial.repository';

type IndexTutorialRequest = FindAllProps;

type IndexTutorialResponse = SuccessResponse<FindAllResponse>;

@Injectable()
export class GetAllTutorialsUseCase {
  constructor(
    private readonly tutorialRepository: TutorialRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async execute({ page = '1', perPage = '10', ...props }: IndexTutorialRequest): Promise<IndexTutorialResponse> {
    const cached = await this.cacheManager.get<FindAllResponse>(`tutorials:${page}${perPage}${JSON.stringify(props)}`);
    if (cached) {
      return {
        data: cached,
        status: HttpStatus.OK,
      };
    }

    const tutorials = await this.tutorialRepository.findAll({ page, perPage, ...props });

    await this.cacheManager.set(`tutorials:${page}${perPage}${JSON.stringify(props)}`, tutorials);

    return {
      data: tutorials,
      status: HttpStatus.OK,
    };
  }
}
