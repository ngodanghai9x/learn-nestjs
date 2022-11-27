import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { ApiTags } from '@nestjs/swagger/dist';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor.ts';
import { sleep } from 'src/common/utils/sleep';

@ApiTags('user')
@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('testFilter')
  // @UseFilters(HttpExceptionFilter)
  async testFilter() {
    throw new Error(`123Error`);
    throw new MyForbiddenException();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(@Query('abc') abc: string) {
    await sleep(1200);
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
