import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SwaggerModule } from '@nestjs/swagger/dist';
import { ExternalService } from './external/services/external.service';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Main server')
    .setDescription('Learn nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function runService(app: INestApplication) {
  const externalService = app.get(ExternalService); // get any service (AppService)
  const worldIndexes = await externalService
    .getWorldIndexes2()
    .then((res) => res.data)
    .catch((err) => {
      Logger.error(err);
    });
  Logger.log('Get worldIndexes success');
}

function applyMiddleware(app: INestApplication) {
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Generally, Helmet is just a collection of smaller middleware functions that set security-related HTTP headers (read more).
  app.use(helmet());
  app.use(loggerMiddleware);
  // const { httpAdapter } = app.get(HttpAdapterHost<any>);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalInterceptors(new LoggingInterceptor());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const logger = new Logger('bootstrap');
  const configService = app.get(ConfigService); // get any service (AppService)

  const port = configService.get('PORT');
  const host = configService.get('HOST');

  setupSwagger(app);
  applyMiddleware(app);

  await app.listen(port, host, () => {
    Logger.log(`Main server is running on port: ${port}`);
    logger.log(`Main swagger is running on: http://${host}:${port}/swagger`);
  });

  await runService(app);
}
bootstrap();
