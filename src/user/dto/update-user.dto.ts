// import { PartialType } from '@nestjs/mapped-types';
// must nest g resource plural nouns
import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto extends PickType(CreateUserDto, ['fullName']) {}
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {}
