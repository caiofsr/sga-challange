import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.items.find((user) => user.username === username);
  }

  async save(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }
}
