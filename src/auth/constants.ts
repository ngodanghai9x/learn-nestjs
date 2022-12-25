import { ConfigModule } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

// const configService = new ConfigService();
console.log('🚀 ~ process.env.JWT_SECRET', process.env.JWT_SECRET);
export const jwtConstants: JwtModuleOptions = {
  // await ConfigModule.envVariablesLoaded;
  secret: process.env.JWT_SECRET || null,
  signOptions: { expiresIn: '60s', algorithm: 'HS256' },
};
