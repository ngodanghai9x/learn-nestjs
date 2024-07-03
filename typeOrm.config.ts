import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Role } from './src/entities/role.entity';
import { User } from './src/entities/user.entity';
import { UserDetail } from './src/entities/user_detail.entity';
// import { Init1671965498960 } from './postgres-migrations/1671965498960-Init';
import { Logger } from '@nestjs/common';
import { join } from 'path';

config();

const configService = new ConfigService();
// https://wanago.io/2022/07/25/api-nestjs-database-migrations-typeorm/
const isUsePostgres = configService.get('DB_TYPE') === 'postgres';

export default new DataSource(
  isUsePostgres
    ? {
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        // entities: [Role, User, UserDetail],
        entities: [join(process.cwd(), 'src/entities/*.ts')],
        // entities: ['src/entities/**/*.ts'],
        // entities: [__dirname + '../entities/*.ts'],
        // entities: ['../entities/User.ts'],
        // keepConnectionAlive: true,
        // migrations: [Init1671965498960],
        migrationsTableName: 'migrations', // default table name
        migrations: [join(process.cwd(), 'postgres-migrations/*.ts')],
        // migrations: ['/..migrations/*.ts'],
        // cli: {
        //   migrationsDir: 'migrations',
        // },
        // extra: {
        //   connectionLimit: +configService.get('PG_CONNECT_LIMIT'),
        // },
      }
    : {
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [join(process.cwd(), 'src/entities/*.ts')],
        // autoLoadEntities: true,
        logging: ['error'],
        migrationsTableName: 'migrations', // default table name
        migrations: [join(process.cwd(), 'mysql-migrations/*.ts')],
      },
);
