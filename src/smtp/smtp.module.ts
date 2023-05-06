import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SMTP_CLIENT } from 'src/smtp/smtp.consts';
import { SmtpService } from './smtp.service';
import { SmtpClientEtherealMail } from './smtpClients/etherealMail.client';

@Module({
  providers: [
    SmtpService,
    {
      provide: SMTP_CLIENT,
      useFactory: (configService: ConfigService) =>
        new SmtpClientEtherealMail(configService),
      inject: [ConfigService],
    },
  ],
  exports: [SmtpService],
  imports: [ConfigModule.forRoot()],
})
export class SmtpModule {}
