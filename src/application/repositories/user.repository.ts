import { User } from '../entities/user';

export abstract class UserRepository {
  abstract getUserByUsername(username: string): Promise<User | undefined>;
  abstract save(user: User): Promise<User>;
}
