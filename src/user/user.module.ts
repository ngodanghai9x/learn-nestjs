import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserDetail } from './entities/user_detail.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserDetail]), ConfigModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      // apply entire app, not only UserModule
      provide: APP_FILTER,
      // provide: 'MODULE_FILTER',
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
