import { Controller, Request, UseFilters } from '@nestjs/common';
import { Post, UseGuards, Get } from '@nestjs/common/decorators';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus(@Request() req) {
    return 'authenticated';
  }

  @Get('testFilter')
  @UseFilters(HttpExceptionFilter)
  async testFilter() {
    throw new Error(`123Error`);
    throw new MyForbiddenException();
  }
}
