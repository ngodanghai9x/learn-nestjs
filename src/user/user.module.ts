import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserDetail } from './entities/user_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserDetail])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
