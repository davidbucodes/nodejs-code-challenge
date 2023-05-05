import { DatabaseService } from 'src/keyValueDatabase/keyValueDatabase.service';

export const databaseServiceMock: Partial<DatabaseService> = {
  get: jest.fn(),
  set: jest.fn(),
};
