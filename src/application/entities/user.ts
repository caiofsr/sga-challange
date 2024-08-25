import { randomUUID } from 'node:crypto';
import { ApiProperty } from '@nestjs/swagger';

export type UserProps = {
  id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id ?? randomUUID();
    this.username = props.username;
    this.password = props.password;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  static create(props: UserProps): User {
    return new User(props);
  }
}
