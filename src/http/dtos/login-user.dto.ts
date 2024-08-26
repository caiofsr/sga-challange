import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
