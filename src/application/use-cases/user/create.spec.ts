import { HttpStatus } from '@nestjs/common';
import { CreateUserUseCase } from './create';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user.repository';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repository';

describe('Create User', () => {
  let useCase: CreateUserUseCase;
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    const { status, data } = await useCase.execute({
      username: 'username',
      password: '123456',
    });

    expect(status).toBe(HttpStatus.CREATED);
    expect(data).toBeInstanceOf(User);
    expect(data.id).toBeTruthy();
    expect(data.username).toBe('username');
    expect(data.createdAt).toBeInstanceOf(Date);
    expect(data.updatedAt).toBeInstanceOf(Date);
  });
});
