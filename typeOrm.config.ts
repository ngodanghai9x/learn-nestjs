import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Role } from './src/user/entities/role.entity';
import { User } from './src/user/entities/user.entity';
import { UserDetail } from './src/user/entities/user_detail.entity';
import { Init1671965498960 } from './migrations/1671965498960-Init';

config();

const configService = new ConfigService();
console.log(`🚀 ~  configService.get('PG_HOST')`, configService.get('PG_HOST'));

export default new DataSource({
  type: 'postgres',
  host: configService.get('PG_HOST'),
  port: configService.get('PG_PORT'),
  username: configService.get('PG_USERNAME'),
  password: configService.get('PG_PASSWORD'),
  database: configService.get('PG_DATABASE'),
  entities: [Role, User, UserDetail],
  migrations: [Init1671965498960],
});
