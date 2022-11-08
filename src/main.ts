import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import csurf from 'csurf';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('Learn nestjs example')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // const { httpAdapter } = app.get(HttpAdapterHost<any>);

  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.use(loggerMiddleware);
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Generally, Helmet is just a collection of smaller middleware functions that set security-related HTTP headers (read more).
  app.use(helmet());
  // Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website where unauthorized commands are transmitted from a user that the web application trusts. To mitigate this kind of attack you can use the csurf package.
  app.use(csurf());

  await app.listen(port, () => {
    logger.log(`Server is running on port: ${port}`);
    // Logger.log(`Server is running on port: ${port}`);
  });
}
bootstrap();
