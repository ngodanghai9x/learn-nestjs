import { Controller, UseFilters, Query } from '@nestjs/common';
import { Post, UseGuards, Get, Body } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { LoginInput } from 'src/common/interfaces/requests';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiBody({ type: [LoginInput] })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginInput) {
    return this.authService.createJwt(body.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'abc1', type: Number })
  @Get('status')
  getStatus(@Query('abc2') abc2: string) {
    return 'authenticated';
  }

  @Get('testFilter')
  @UseFilters(HttpExceptionFilter)
  async testFilter() {
    throw new Error(`123Error`);
    throw new MyForbiddenException();
  }
}
