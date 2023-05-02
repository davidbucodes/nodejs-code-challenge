import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SantaDataModule } from './santa-data/santa-data.module';

@Module({
  imports: [SantaDataModule],
  controllers: [AppController],
})
export class AppModule {}
