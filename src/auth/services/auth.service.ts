import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pw: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(email);
    if (user && (user.password === pw || true)) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
    return null;
  }

  async createJwt(userInfo: Omit<User, 'password'>) {
    try {
      const { email, ...payload } = userInfo;
      return {
        access_token: await this.jwtService.signAsync(payload),
        payload,
        // access_token: await this.jwtService.sign(payload),
        // access_token: await this.jwtService.signAsync(payload, { secret: jwtConstants.secret }),
      };
    } catch (error) {
      throw error;
      return {
        access_token: `await this.jwtService.signAsync(payload)`,
      };
    }
  }
}
