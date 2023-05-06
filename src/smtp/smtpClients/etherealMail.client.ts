import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  EnvironmentVariables,
  SendEmailRequest,
  SmtpClient,
} from 'src/smtp/smtp.types';

export class SmtpClientEtherealMail implements SmtpClient {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: this.smtpAccountUsername,
        pass: this.smtpAccountPassword,
      },
    });
  }

  private get smtpAccountUsername() {
    return this.configService.get<string>('SMTP_ACCOUNT_USERNAME');
  }

  private get smtpAccountPassword() {
    return this.configService.get<string>('SMTP_ACCOUNT_PASSWORD');
  }

  async sendEmail(emailRequest: SendEmailRequest): Promise<void> {
    await this.transporter.sendMail({
      from: emailRequest.sender,
      to: emailRequest.sendTo,
      subject: emailRequest.title,
      text: emailRequest.content,
    });
  }
}
