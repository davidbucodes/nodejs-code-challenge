import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { DatabaseModule } from './keyValueDatabase/keyValueDatabase.module';
import { SmtpModule } from './smtp/smtp.module';
import { WishModule } from './wish/wish.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    WishModule,
    DatabaseModule,
    WishModule,
    SmtpModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
