import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { loggerMiddleware, LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { BullModule } from '@nestjs/bull';
import { ExternalModule } from './external/external.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { MicroServicesModule } from './micro-services/micro-services.module';
import { NotificationModule } from './notification/notification.module';
import { EjsModule } from './ejs/ejs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
console.log('🚀 ~ file: app.module.ts:21 ~ ServeStaticModule', {
  ['process.cwd()']: process.cwd(),
  ['__dirname']: __dirname,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
      expandVariables: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log('MYSQL_PORT', configService.get('MYSQL_PORT'));
    //     return {
    //       type: 'mysql',
    //       host: configService.get('MYSQL_HOST'),
    //       port: configService.get('MYSQL_PORT'),
    //       username: configService.get('MYSQL_USERNAME'),
    //       password: configService.get('MYSQL_PASSWORD'),
    //       database: configService.get('MYSQL_DATABASE'),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('PG_PORT', configService.get('PG_PORT'));
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: configService.get('PG_PORT'),
          username: configService.get('PG_USERNAME'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DATABASE'),
          autoLoadEntities: true,
          // synchronize: true,
          logging: ['error'],
          // extra: {
          //   connectionLimit: +configService.get('PG_CONNECT_LIMIT'),
          // },
          migrationsTableName: 'migrations', // default table name
          migrations: [join(process.cwd(), 'migration/*.ts')],
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ServeStaticModule.forRoot({
      // no required because this app already implements useStaticAssets in public folder
      rootPath: join(process.cwd(), 'static'),
      // rootPath: join(__dirname, '..', 'static'),
    }),
    AuthModule,
    UserModule,
    ExternalModule,
    CronjobModule,
    MicroServicesModule,
    NotificationModule,
    EjsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .apply(loggerMiddleware)
      // .forRoutes({ path: 'auth', method: RequestMethod.ALL });
      .forRoutes(AuthController);
  }
}
