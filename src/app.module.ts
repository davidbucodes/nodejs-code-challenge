import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './keyValueDatabase/keyValueDatabase.module';
import { WishModule } from './wish/wish.module';

@Module({
  imports: [WishModule, DatabaseModule, WishModule],
  controllers: [AppController],
})
export class AppModule {}
