import { Module } from '@nestjs/common';
import { ExternalService } from './services/external.service';
import { ExternalController } from './controllers/external.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 15000,
        maxRedirects: 10,
        responseType: 'json',
      }),
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // await ConfigModule.envVariablesLoaded;
        console.log('configService.get HTTP_TIMEOUT', configService.get<string>('HTTP_TIMEOUT'));
        return {
          timeout: configService.get('HTTP_TIMEOUT'),
          maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
        };
      },
    }),
  ],
  controllers: [ExternalController],
  providers: [ExternalService],
})
export class ExternalModule {}
