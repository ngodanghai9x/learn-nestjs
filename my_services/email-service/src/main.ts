import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, INestMicroservice, Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const port = 3006;
const host = 'localhost';
let microServicePort = 3007;

function setupSwagger(app: INestApplication) {
  // const app = _app as unknown as INestApplication;
  const config = new DocumentBuilder()
    .setTitle('Email service server')
    .setDescription(
      `INestApplication running on port ${port}, INestMicroservice running on port ${microServicePort}`,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
function logging(logger: Logger, p: number, h: string) {
  logger.log(`Email service server is running on port: ${p}`);
  logger.log(`Email service swagger is running on: http://${h}:${p}/swagger`);
  logger.log(
    `INestApplication running on port ${port}, INestMicroservice running on port ${microServicePort}`,
  );
}

async function bootstrap2Port() {
  const logger = new Logger('bootstrap2Port');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const microservice: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      // logger: ['error', 'warn', 'log'],
      options: {
        host,
        port: microServicePort,
      },
    });
  // const app = await NestFactory.createApplication(microservice);
  // const app = new NestApplication(microservice.httpServer);
  // await app.init(microservice);
  // const app1 = await microservice.init();
  // setupSwagger(app1 as unknown as INestApplication);
  setupSwagger(app);

  await microservice.listen();

  await app.listen(port, host, () => logging(logger, port, host));
}
async function bootstrap1Port() {
  const logger = new Logger('bootstrap1Port');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  microServicePort = port;

  const microservice: INestMicroservice =
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    });

  setupSwagger(app);

  await app.startAllMicroservices();
  logging(logger, port, host);
}

bootstrap1Port();
// bootstrap2Port();
