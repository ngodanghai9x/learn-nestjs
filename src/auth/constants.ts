import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

// const configService = new ConfigService();
Logger.log('🚀 ~ process.env.JWT_SECRET', process.env.JWT_SECRET);
export const jwtConstants: JwtModuleOptions = {
  // await ConfigModule.envVariablesLoaded;
  secret: process.env.JWT_SECRET || null,
  signOptions: { expiresIn: process.env.JWT_LIFE, algorithm: 'HS256' },
};
