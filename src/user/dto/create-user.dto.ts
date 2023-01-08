import { ApiProperty } from '@nestjs/swagger';
import { ERole } from 'src/common/constants/role';
export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  moreDetail: string;

  @ApiProperty({ enum: ERole, default: [], isArray: true })
  roles?: ERole[] = [];
}
