import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // default: will get username, pw from body req then call validate
    // super();
    super({
      usernameField: 'email',
      passwordField: 'pw',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('LocalStrategy', username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
