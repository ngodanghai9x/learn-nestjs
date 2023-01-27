import { Controller, UseFilters, Query, Request, Logger } from '@nestjs/common';
import { Post, UseGuards, Get, Body, Headers } from '@nestjs/common/decorators';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
import { ERole } from 'src/common/constants/role';
import { HasRoles } from 'src/common/decorators/roles.decorator';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoginInput } from 'src/common/interfaces/requests';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiBody({ type: [LoginInput] })
  @UseGuards(LocalAuthGuard) // POST: auth/login > LocalStrategy > LocalAuthGuard (append user into req) > login
  @Post('login')
  @ApiOperation({ summary: '123summary goes here' })
  async login(@Body() body: LoginInput, @Request() req) {
    return this.authService.createJwt(req.user); // from: LocalAuthGuard.name
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'abc1', type: Number })
  @Get('status')
  getStatus() {
    return 'authenticated';
  }

  @ApiBasicAuth()
  @Get('status2')
  getStatus2(@Headers('Authorization') authHeader: string) {
    const basic = authHeader.split('Basic ')[1] || '';
    const [username, password] = Buffer.from(basic, 'base64').toString().split(':');
    return basic + ' ' + 'authenticated' + JSON.stringify({ username, password });
  }

  @Get('testFilter')
  @UseFilters(HttpExceptionFilter)
  async testFilter() {
    // throw new Error(`123Error`);
    // throw new MyForbiddenException();
    throw { abc: 1 };
  }

  @HasRoles(ERole.Admin)
  @UseGuards(RolesGuard)
  @Get('testAuthorz')
  testAuthorz(@Query('roles') roles: string[]) {
    Logger.log('testAuthorz roles', roles);
    return 'authenticated';
  }
}
