import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { WishModule } from './wish/wish.module';

@Module({
  imports: [ScheduleModule.forRoot(), WishModule],
  controllers: [AppController],
})
export class AppModule {}
