import { PartialType } from '@nestjs/mapped-types';
// must nest g resource plural nouns
// import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
