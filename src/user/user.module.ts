import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { UserDetail } from 'src/entities/user_detail.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { BullModule } from '@nestjs/bull/dist/bull.module';
import { EQueue } from 'src/common/constants/queue';
import { UserProcessor } from './user.processor';
import { IdentityService } from './services/identity.service';
import { FileController } from './controllers/file.controller';
import { MicroServicesModule } from 'src/micro-services/micro-services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserDetail]),
    ConfigModule,
    BullModule.registerQueue({
      name: EQueue.User,
    }),
    MicroServicesModule,
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
