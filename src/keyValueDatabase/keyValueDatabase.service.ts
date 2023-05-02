import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private inMemoryDatabase: Record<string, unknown> = {};

  get<T = unknown>(key: string) {
    return this.inMemoryDatabase[key] as T;
  }

  set<T>(key: string, value: T) {
    this.inMemoryDatabase[key] = value;
    console.log('set', key, value);
  }
}
