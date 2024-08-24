import { Tutorial as PrismaTutorial } from '@prisma/client';
import { Tutorial } from 'src/application/entities/tutorial';
import { PrismaPaginatedResponse } from '../utils/pagination';

export class PrismaTutorialMapper {
  static toPrisma(tutorial: Tutorial) {
    return {
      id: tutorial.id,
      title: tutorial.title,
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
    };
  }

  static toDomain(tutorial: PrismaTutorial) {
    return Tutorial.create({
      id: tutorial.id,
      title: tutorial.title,
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
    });
  }

  static toDomainPaginated({ meta, data }: PrismaPaginatedResponse) {
    return {
      data: data.map(this.toDomain),
      meta,
    };
  }
}
