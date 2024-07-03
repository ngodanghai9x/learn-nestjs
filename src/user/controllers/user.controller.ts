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
  SetMetadata,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { ApiTags } from '@nestjs/swagger/dist';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { EmailSvService } from 'src/micro-services/email-sv/email-sv.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AppendLogParamInterceptor } from 'src/common/interceptors/append-log-param.interceptor';
import { Request } from 'express';
import { AppendLogParamInterceptor2 } from 'src/common/interceptors/append-log-param2.interceptor';
import { AppendLogParam } from 'src/common/decorators/append-log-param.decorator';

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

  @UseInterceptors(AppendLogParamInterceptor2('hai-haha2'))
  @AppendLogParam('hai-haha1')
  // @SetMetadata('customValue', 'hai-haha1')
  // @UseInterceptors(AppendLogParamInterceptor)
  // @UseInterceptors(() => new AppendLogParamInterceptor('hai-haha')) // NOT WORKING
  @Get('i18n')
  async getHello(@I18n() i18n: I18nContext, @Req() req: Request) {
    return {
      i18n: i18n.t('user.cat'),
      appendParm: req['append_log_param'],
      appendParm2: req['append_log_param2'],
    };
  }

  @Get('i18n/v2')
  async getHello2(@I18n() i18n: I18nContext) {
    return { message: 'user.cat' };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('test-transaction')
  testTransaction(@Body() createUserDto: CreateUserDto) {
    return this.userService.testTransaction(createUserDto);
  }

  @Post('queue')
  appendQueue(@Body() createUserDto: CreateUserDto) {
    return this.userService.appendQueue({
      age: +createUserDto.moreDetail || 0,
      name: createUserDto.username,
    });
  }

  @Get()
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
