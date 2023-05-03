import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/keyValueDatabase/keyValueDatabase.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { UserModule } from 'src/user/user.module';
import { WishService } from 'src/wish/wish.service';
import { WishController } from './wish.controller';

describe('WishController', () => {
  let controller: WishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishController],
      providers: [WishService],
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        DatabaseModule,
        SmtpModule,
        UserModule,
      ],
    }).compile();

    controller = module.get<WishController>(WishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
