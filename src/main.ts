import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { loggerMiddleware } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // const { httpAdapter } = app.get(HttpAdapterHost<any>);

  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.use(loggerMiddleware);

  await app.listen(port, () => {
    logger.log(`Server is running on port: ${port}`);
    // Logger.log(`Server is running on port: ${port}`);
  });
}
bootstrap();
