import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Tutorial } from 'src/application/entities/tutorial';
import { PrismaTutorialMapper } from '../mappers/prisma-tutorial.mapper';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

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

  findAll(): Promise<Tutorial[]> {
    throw new Error('Method not implemented.');
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
