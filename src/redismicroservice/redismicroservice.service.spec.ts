import { Test, TestingModule } from '@nestjs/testing';
import { RedismicroserviceService } from './redismicroservice.service';

describe('RedismicroserviceService', () => {
  let service: RedismicroserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedismicroserviceService],
    }).compile();

    service = module.get<RedismicroserviceService>(RedismicroserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
