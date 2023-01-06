import { Test, TestingModule } from '@nestjs/testing';
import { ExternalController } from './external.controller';
import { ExternalService } from '../services/external.service';

describe('ExternalController', () => {
  let controller: ExternalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalController],
      providers: [ExternalService],
    }).compile();

    controller = module.get<ExternalController>(ExternalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
