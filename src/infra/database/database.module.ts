import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repository/prisma-user.repository';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';
import { PrismaTutorialRepository } from './prisma/repository/prisma-tutorial.repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: TutorialRepository, useClass: PrismaTutorialRepository },
  ],
  exports: [TutorialRepository, UserRepository],
})
export class DatabaseModule {}
