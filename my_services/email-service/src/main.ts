import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, INestMicroservice, Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
  // const app = _app as unknown as INestApplication;
  const config = new DocumentBuilder()
    .setTitle('Email service server')
    .setDescription(
      'INestApplication running on 3006, INestMicroservice running on 3007',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const port = 3006;
  const host = 'localhost';

  const microservice: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      logger: ['error', 'warn', 'log'],
      options: {
        host,
        port: 3007,
      },
    });
  const logger = new Logger('bootstrap');
  // const app = await NestFactory.createApplication(microservice);
  setupSwagger(app);

  await microservice.listen();

  await app.listen(port, host, () => {
    logger.log(`Email service server is running on port: ${port}`);
    logger.log(
      `Email service swagger is running on: http://${host}:${port}/swagger`,
    );
  });
}
bootstrap();
