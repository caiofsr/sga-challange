import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Tutorial } from 'src/application/entities/tutorial';
import { PrismaTutorialMapper } from '../mappers/prisma-tutorial.mapper';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

@Injectable()
export class PrismaTutorialRepository implements TutorialRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<Tutorial[]> {
    throw new Error('Method not implemented.');
  }
  async save(tutorial: Tutorial): Promise<Tutorial> {
    const prismaTutorial = PrismaTutorialMapper.toPrisma(tutorial);

    return await this.prismaService.tutorial.create({
      data: prismaTutorial,
    });
  }
  delete(tutorial: Tutorial): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
