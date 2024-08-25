import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user.repository';

export class PrismaUserRepository implements UserRepository {
  save(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
}
