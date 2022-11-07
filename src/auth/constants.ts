import { ConfigModule } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleOptions = {
  // await ConfigModule.envVariablesLoaded;
  secret: process.env.JWT_SERCET,
  signOptions: { expiresIn: '60s', algorithm: 'HS256' },
};
