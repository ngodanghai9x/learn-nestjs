import { ApiProperty } from '@nestjs/swagger';

export interface ILoginInput {
  user?: any;
  email: string;
  pw: string;
}

export class LoginInput implements ILoginInput {
  @ApiProperty({ required: false })
  user?: any;

  @ApiProperty()
  email: string;

  @ApiProperty()
  pw: string;
}
