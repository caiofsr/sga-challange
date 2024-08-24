import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { paginate } from '../utils/pagination';
import { Tutorial } from 'src/application/entities/tutorial';
import { PrismaTutorialMapper } from '../mappers/prisma-tutorial.mapper';
import { getBeginningAndEndOfDay } from 'src/utils/get-beginning-and-end-of-day';
import { FindAllProps, FindAllResponse, TutorialRepository } from 'src/application/repositories/tutorial.repository';

@Injectable()
export class PrismaTutorialRepository implements TutorialRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Tutorial | undefined> {
    const tutorial = await this.prismaService.tutorial.findUnique({
      where: {
        id,
      },
    });

    if (!tutorial) {
      return;
    }

    return PrismaTutorialMapper.toDomain(tutorial);
  }

  async findAll({ perPage, page, title, createdAt, updatedAt }: FindAllProps): Promise<FindAllResponse> {
    let startOfDayCreatedAt: string | undefined;
    let endOfDayCreatedAt: string | undefined;
    let startOfDayUpdatedAt: string | undefined;
    let endOfDayUpdatedAt: string | undefined;

    if (createdAt) {
      const created = getBeginningAndEndOfDay(createdAt);
      startOfDayCreatedAt = created.beginningOfDay;
      endOfDayCreatedAt = created.endOfDay;
    }
    if (updatedAt) {
      const updated = getBeginningAndEndOfDay(updatedAt);
      startOfDayUpdatedAt = updated.beginningOfDay;
      endOfDayUpdatedAt = updated.endOfDay;
    }

    const tutorials = await paginate(this.prismaService, {
      modelName: 'Tutorial',
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        createdAt: {
          gte: startOfDayCreatedAt,
          lte: endOfDayCreatedAt,
        },
        updatedAt: {
          gte: startOfDayUpdatedAt,
          lte: endOfDayUpdatedAt,
        },
      },
      page,
      perPage,
    });

    return PrismaTutorialMapper.toDomainPaginated(tutorials);
  }

  async save(tutorial: Tutorial): Promise<Tutorial> {
    const prismaTutorial = PrismaTutorialMapper.toPrisma(tutorial);

    const savedTutorial = await this.prismaService.tutorial.upsert({
      where: {
        id: tutorial.id,
      },
      create: prismaTutorial,
      update: prismaTutorial,
    });
    return PrismaTutorialMapper.toDomain(savedTutorial);
  }

  async delete(tutorial: Tutorial): Promise<void> {
    await this.prismaService.tutorial.delete({
      where: {
        id: tutorial.id,
      },
    });
  }
}
