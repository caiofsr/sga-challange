import { Response } from 'express';
import { User } from 'src/application/entities/user';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/infra/auth/auth.service';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/infra/auth/guards/local-auth.guard';
import { CreateUserUseCase } from 'src/application/use-cases/user/create';
import { CurrentUser } from 'src/infra/auth/decorators/current-user.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create an user' })
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedResponse({
    description: 'User already exists',
    schema: { type: 'object', properties: { message: { type: 'string', example: 'username already taken' } } },
  })
  async createUser(@Res() response: Response, @Body() body: CreateUserDto) {
    const { data, status } = await this.createUserUseCase.execute(body);

    return response.status(status).json(data);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login an user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
    headers: {
      'Set-Cookie': {
        example: 'Authentication=token',
        description: 'Authentication cookie',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    schema: { type: 'object', properties: { message: { type: 'string', example: 'Invalid credentials' } } },
  })
  async loginUser(@CurrentUser() user: User, @Res() response: Response) {
    const { data, status } = await this.authService.login(user);

    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + 1000 * 60 * 60 * 24);

    response.cookie('Authentication', data, {
      httpOnly: true,
      secure: true,
      expires,
    });

    return response.status(status).json();
  }
}
