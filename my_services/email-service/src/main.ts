import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const logger = new Logger('bootstrap');

  const port = 3006;
  const host = 'localhost';

  await app.listen(port, () => {
    logger.log(`Email service server is running on port: ${port}`);
    logger.log(
      `Email service swagger is running on: http://${host}:${port}/swagger`,
    );
  });
}
bootstrap();
