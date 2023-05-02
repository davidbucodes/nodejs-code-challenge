import { Module } from '@nestjs/common';
import { SantaDataController } from './santa-data.controller';
import { SantaDataService } from './santa-data.service';

@Module({
  controllers: [SantaDataController],
  providers: [SantaDataService],
})
export class SantaDataModule {}
