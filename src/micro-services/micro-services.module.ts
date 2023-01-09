import { Module } from '@nestjs/common';
import { EmailSvService } from './email-sv/email-sv.service';
import { EmailSvController } from './email-sv/email-sv.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'EMAIL_MICRO_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const host = configService.get('EMAIL_TCP_SV_HOST');
          const port = configService.get('EMAIL_TCP_SV_PORT');
          return {
            transport: Transport.TCP,
            options: {
              host,
              port,
            },
          };
        },
      },
    ]),
  ],
  controllers: [EmailSvController],
  providers: [
    EmailSvService,
    // {
    //   provide: 'EMAIL_MICRO_SERVICE',
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const host = configService.get('EMAIL_TCP_SV_HOST');
    //     const port = configService.get('EMAIL_TCP_SV_PORT');
    //     return ClientProxyFactory.create({
    //       transport: Transport.TCP,
    //       options: {
    //         host,
    //         port,
    //       },
    //     });
    //   },
    // },
  ],
  exports: [EmailSvService],
})
export class MicroServicesModule {}
