import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [HttpModule],
  exports: [UserService],
})
export class UserModule {}
