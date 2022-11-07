import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  // const logger = Logger;
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // app.use(loggerMiddleware);

  await app.listen(port, () => {
    logger.log(`Server is running on port: ${port}`);
  });
}
bootstrap();
