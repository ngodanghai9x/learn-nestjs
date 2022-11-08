import { Controller, UseFilters, Query } from '@nestjs/common';
import { Post, UseGuards, Get, Body } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginInput) {
    return this.authService.createJwt(body.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'abc1', type: Number })
  @Get('status')
  getStatus() {
    return 'authenticated';
  }

  @Get('testFilter')
  @UseFilters(HttpExceptionFilter)
  async testFilter() {
    throw new Error(`123Error`);
    throw new MyForbiddenException();
  }

  @HasRoles(ERole.Admin)
  @UseGuards(RolesGuard)
  @Get('testAuthorz')
  testAuthorz(@Query('roles') roles: string[]) {
    console.log('testAuthorz roles', roles);
    return 'authenticated';
  }
}
