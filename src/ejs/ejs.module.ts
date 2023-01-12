import { Module } from '@nestjs/common';
import { EjsService } from './ejs.service';
import { EjsController } from './ejs.controller';

@Module({
  controllers: [EjsController],
  providers: [EjsService]
})
export class EjsModule {}
