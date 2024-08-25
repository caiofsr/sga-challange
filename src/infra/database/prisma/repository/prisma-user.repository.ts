import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/application/entities/user';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { UserRepository } from 'src/application/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<User> {
    const prismaUser = PrismaUserMapper.toPrisma(user);

    const savedTutorial = await this.prismaService.user.upsert({
      where: {
        id: user.id,
      },
      create: prismaUser,
      update: prismaUser,
    });

    return PrismaUserMapper.toDomain(savedTutorial, ['password']);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
