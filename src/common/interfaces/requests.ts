import { ApiProperty } from '@nestjs/swagger';

export interface ILoginInput {
  user?: any;
  username: string;
  password: string;
}

export class LoginInput implements ILoginInput {
  @ApiProperty({ required: false })
  user?: any;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
