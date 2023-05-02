import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './keyValueDatabase.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('set', () => {
    it('should set at the database', () => {
      service.set('test', 'test');
      expect(service['inMemoryDatabase']['test']).toEqual('test');
    });
  });

  describe('get', () => {
    it('should set at the database', () => {
      service['inMemoryDatabase']['test'] = 'test';
      expect(service.get('test')).toEqual('test');
    });
  });
});
