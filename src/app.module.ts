import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SantaDataModule } from './santa-data/santa-data.module';

@Module({
  imports: [SantaDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
