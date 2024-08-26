import { faker } from '@faker-js/faker';
import { User, UserProps } from 'src/application/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return User.create({
    id: override.id,
    username: override.username ?? faker.internet.userName(),
    password: override.password ?? faker.internet.password(),
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  });
}

export function makeManyUsers(count: number) {
  return Array.from({ length: count }, () => makeUser());
}
