import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/keyValueDatabase/keyValueDatabase.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { UserModule } from 'src/user/user.module';
import { WishController } from './wish.controller';
import { WishService } from './wish.service';

@Module({
  controllers: [WishController],
  providers: [WishService],
  imports: [ConfigModule.forRoot(), DatabaseModule, SmtpModule, UserModule],
})
export class WishModule {}
