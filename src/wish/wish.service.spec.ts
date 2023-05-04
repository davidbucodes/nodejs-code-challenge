import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/keyValueDatabase/keyValueDatabase.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { UserModule } from 'src/user/user.module';
import { WishService } from './wish.service';

describe('WishService', () => {
  let service: WishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishService],
      imports: [DatabaseModule, SmtpModule, UserModule],
    }).compile();

    service = module.get<WishService>(WishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
