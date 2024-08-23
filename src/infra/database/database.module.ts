import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';
import { PrismaTutorialRepository } from './prisma/repository/prisma-tutorial.repository';

@Module({
  providers: [
    PrismaService,
    { provide: TutorialRepository, useClass: PrismaTutorialRepository },
  ],
  exports: [TutorialRepository],
})
export class DatabaseModule {}
