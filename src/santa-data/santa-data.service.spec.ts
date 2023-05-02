import { Test, TestingModule } from '@nestjs/testing';
import { SantaDataService } from './santa-data.service';

describe('SantaDataService', () => {
  let service: SantaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SantaDataService],
    }).compile();

    service = module.get<SantaDataService>(SantaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
