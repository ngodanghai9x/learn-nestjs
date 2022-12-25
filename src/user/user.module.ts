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
import { BullModule } from '@nestjs/bull/dist/bull.module';
import { EQueue } from 'src/common/constants/queue';
import { UserProcessor } from './user.processor';
import { IdentityService } from './services/identity.service';
import { FileController } from './controllers/file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserDetail]),
    ConfigModule,
    BullModule.registerQueue({
      name: EQueue.User,
    }),
  ],
  controllers: [UserController, FileController],
  providers: [
    UserService,
    UserProcessor,
    IdentityService,
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
