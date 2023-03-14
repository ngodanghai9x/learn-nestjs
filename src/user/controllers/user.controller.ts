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
import { EmailSvService } from 'src/micro-services/email-sv/email-sv.service';

@ApiTags('user')
@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailSvService: EmailSvService,
  ) {}

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

  @Post('queue')
  appendQueue(@Body() createUserDto: CreateUserDto) {
    return this.userService.appendQueue({
      age: +createUserDto.moreDetail || 0,
      name: createUserDto.username,
    });
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(@Query('abc') abc: string) {
    return this.userService.findAll();
  }

  @Get(':idOrEmail')
  findOne(@Param('idOrEmail') idOrEmail: string) {
    return this.userService.findOne(idOrEmail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('sendEmail')
  sendEmail() {
    return this.emailSvService.sendEmail();
  }

  @Post('emitSendEmail')
  emitSendEmail() {
    return this.emailSvService.emitSendEmail();
  }
}
