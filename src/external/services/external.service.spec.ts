import { Test, TestingModule } from '@nestjs/testing';
import { ExternalService } from './external.service';

describe('ExternalService', () => {
  let service: ExternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalService],
    }).compile();

    service = module.get<ExternalService>(ExternalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
