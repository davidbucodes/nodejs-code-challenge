import { Test, TestingModule } from '@nestjs/testing';
import { SantaDataController } from './santa-data.controller';

describe('SantaDataController', () => {
  let controller: SantaDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SantaDataController],
    }).compile();

    controller = module.get<SantaDataController>(SantaDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
