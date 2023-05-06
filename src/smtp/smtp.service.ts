import { Inject, Injectable } from '@nestjs/common';
import { SMTP_CLIENT } from 'src/smtp/smtp.consts';
import { SendEmailRequest, SmtpClient } from '../smtp/smtp.types';

@Injectable()
export class SmtpService {
  constructor(@Inject(SMTP_CLIENT) private readonly smtpClient: SmtpClient) {}

  async sendEmail(sendEmailRequest: SendEmailRequest) {
    await this.smtpClient.sendEmail(sendEmailRequest);
  }
}
