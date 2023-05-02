import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/keyValueDatabase/keyValueDatabase.module';
import { UserModule } from 'src/user/user.module';
import { WishController } from './wish.controller';
import { WishService } from './wish.service';

@Module({
  controllers: [WishController],
  providers: [WishService],
  imports: [UserModule, DatabaseModule],
})
export class WishModule {}
