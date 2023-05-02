import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SantaDataController } from './santa-data.controller';
import { SantaDataService } from './santa-data.service';

@Module({
  controllers: [SantaDataController],
  providers: [SantaDataService],
  imports: [UserModule],
})
export class SantaDataModule {}
