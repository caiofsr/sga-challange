import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/application/entities/user';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserRepository } from 'src/application/repositories/user.repository';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
      username: user.username,
    };

    const token = this.jwtService.sign(tokenPayload);

    return {
      data: token,
      status: HttpStatus.OK,
    };
  }

  async verifyUser(username: string, password: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
