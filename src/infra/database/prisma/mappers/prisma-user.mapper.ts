import { User as PrismaUser } from '@prisma/client';
import { User, UserProps } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(user: PrismaUser, omit?: [keyof UserProps]): User {
    if (omit?.length > 0) {
      for (const key of omit) {
        delete user[key];
      }

      return User.create(user);
    }

    return User.create({
      id: user.id,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
