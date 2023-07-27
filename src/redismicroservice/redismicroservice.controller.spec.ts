import { Test, TestingModule } from '@nestjs/testing';
import { RedismicroserviceController } from './redismicroservice.controller';

describe('RedismicroserviceController', () => {
  let controller: RedismicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedismicroserviceController],
    }).compile();

    controller = module.get<RedismicroserviceController>(RedismicroserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
