import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pw: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(username);
    if (user && user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createJwt(payload: Pick<User, 'id' | 'username'>) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
