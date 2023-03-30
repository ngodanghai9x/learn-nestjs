import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { graphqlUploadExpress } from 'graphql-upload';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import helmet from 'helmet';
import { join } from 'path';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
// import { SwaggerModule } from '@nestjs/swagger/dist';
import { ExternalService } from './external/services/external.service';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBasicAuth()
    .addBearerAuth()
    .setTitle('Main server')
    .setDescription('Learn nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

function setupViewEngine(app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.setViewEngine('ejs');
}

async function runService(app: INestApplication) {
  const externalService = app.get(ExternalService); // get any service (AppService)
  await externalService
    .getPokemon3()
    .then((res) => Logger.log('Get getPokemon3 success'))
    .catch((err) => {
      Logger.error(err);
    });
}

function applyMiddleware(app: INestApplication) {
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Generally, Helmet is just a collection of smaller middleware functions that set security-related HTTP headers (read more).
  app.use(helmet());
  // app.use(loggerMiddleware);
  app.enableCors({
    origin: '*',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  // https://dev.to/elbarryamine/how-to-upload-files-with-nestjs-and-graphql-2iig
  // https://stephen-knutter.github.io/2020-02-07-nestjs-graphql-file-upload/

  // const { httpAdapter } = app.get(HttpAdapterHost<any>);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalInterceptors(new LoggingInterceptor());
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const logger = new Logger('bootstrap');
  const configService = app.get(ConfigService); // get any service (AppService)

  const port = configService.get('PORT');
  const host = configService.get('HOST');

  setupSwagger(app);
  setupViewEngine(app);
  applyMiddleware(app);

  await app.listen(port, () => {
    Logger.log(`Main server is running on port: ${port}`);
    logger.log(`Main server is running on port: ${port}`);
    console.log(`Main swagger is running on: http://${host}:${port}/swagger`);
    console.log(`process= ${process.cwd()}`);
  });

  // await runService(app);
}
bootstrap();
