import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ExternalService } from '../services/external.service';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('external')
@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}
  private readonly logger = new Logger(ExternalController.name);

  @Get('pokemon/:id')
  async getPokemon(@Param('id') idOrName: string) {
    const data = await firstValueFrom(this.externalService.getPokemon(idOrName));
    return data;
  }

  @Get('worldIndexes')
  async getWorldIndexes() {
    const data = await firstValueFrom(this.externalService.getWorldIndexes());
    return data;
  }

  @Get('worldIndexes2')
  async getWorldIndexes2() {
    const data = await this.externalService.getWorldIndexes2();
    return data;
  }
}
