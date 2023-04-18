import {
  HttpStatus,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from '@nestjs-modules/ioredis';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
import { loggerMiddleware, LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';
import { ExternalModule } from './external/external.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { MicroServicesModule } from './micro-services/micro-services.module';
import { NotificationModule } from './notification/notification.module';
import { EjsModule } from './ejs/ejs.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.ts';
import { GlobalResponseInterceptor } from './common/interceptors/global-response.interceptor';
import { TrimPipe } from './common/pipes/trim.pipe';

const PIPES = [
  {
    provide: APP_PIPE,
    useClass: TrimPipe,
  },
  // {
  //   provide: APP_PIPE,
  //   useFactory: () =>
  //     new ValidationPipe({
  //       transform: true,
  //       transformOptions: { enableImplicitConversion: true },
  //       whitelist: true,
  //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //       exceptionFactory: (errors) => new UnprocessableEntityException(errors),
  //     }),
  // },
];
const FILTERS = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];
const INTERCEPTORS = [
  // {
  //   provide: APP_INTERCEPTOR,
  //   useClass: LoggingInterceptor,
  // },
  {
    provide: APP_INTERCEPTOR,
    useClass: GlobalResponseInterceptor,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isUsePostgres = false;
        if (isUsePostgres) {
          console.log('PG_PORT2', configService.get('PG_PORT'));
          return {
            type: 'postgres',
            host: configService.get('PG_HOST'),
            port: configService.get('PG_PORT'),
            username: configService.get('PG_USERNAME'),
            password: configService.get('PG_PASSWORD'),
            database: configService.get('PG_DATABASE'),
            autoLoadEntities: true,
            // synchronize: true,
            logging: true,
            // logging: ['error'],
            // extra: {
            //   connectionLimit: +configService.get('PG_CONNECT_LIMIT'),
            // },
            migrationsTableName: 'migrations', // default table name
            migrations: [join(process.cwd(), 'postgres-migrations/')],
            // migrations: [join(process.cwd(), 'postgres-migrations/*.ts')],
          };
        }
        console.log(
          'MYSQL_PORT1',
          configService.get('MYSQL_PORT'),
          configService.get('MYSQL_HOST'),
        );
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          autoLoadEntities: true,
          logging: true,
          // logging: ['error'],
          migrationsTableName: 'migrations', // default table name
          migrations: [join(process.cwd(), 'mysql-migrations/')],
          // migrations: [join(process.cwd(), 'mysql-migrations/*.ts')],
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('REDIS_HOST', configService.get('REDIS_HOST'));
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: +configService.get('REDIS_PORT'),
          },
        };
      },
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('REDIS_HOST');
        const port = +configService.get('REDIS_PORT');
        return {
          config: {
            url: `redis://${host}:${port}`,
          },
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        // dateScalarMode: 'timestamp',
      },
      // include: [UserModule, AuthModule],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      fallbacks: {
        'en-CA': 'fr',
        'en-*': 'en',
        'fr-*': 'fr',
        pt: 'pt-BR',
      },
      // loader: I18nJsonLoader,
      resolvers: [new HeaderResolver(['x-language-code'])],
      // resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
      loaderOptions: {
        // path: join(__dirname, '/i18n/'),
        path: join(process.cwd(), 'src', 'i18n'),
        watch: true,
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
    // this will use this guard global in app
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },

    // ...PIPES,
    // ...FILTERS,
    ...INTERCEPTORS,
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
