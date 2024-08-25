import * as bcrypt from 'bcrypt';
import { User } from 'src/application/entities/user';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponse } from 'src/application/types/error-response';
import { SuccessResponse } from 'src/application/types/success-response';
import { UserRepository } from 'src/application/repositories/user.repository';

type CreateUserRequest = {
  username: string;
  password: string;
};

type CreateUserResponse = SuccessResponse<User> | ErrorResponse;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ username, password }: CreateUserRequest): Promise<CreateUserResponse> {
    let user = await this.userRepository.getUserByUsername(username);
    if (user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: { message: 'username already taken' },
      };
    }

    user = User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    user = await this.userRepository.save(user);

    return {
      data: user,
      status: HttpStatus.CREATED,
    };
  }
}
