import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/keyValueDatabase/keyValueDatabase.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { UserModule } from 'src/user/user.module';
import { WishController } from './wish.controller';
import { WishService } from './wish.service';

@Module({
  controllers: [WishController],
  providers: [WishService],
  imports: [DatabaseModule, SmtpModule, UserModule],
})
export class WishModule {}
