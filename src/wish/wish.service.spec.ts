import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
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
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        DatabaseModule,
        SmtpModule,
        UserModule,
      ],
    }).compile();

    service = module.get<WishService>(WishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
