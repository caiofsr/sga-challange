import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [];

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
