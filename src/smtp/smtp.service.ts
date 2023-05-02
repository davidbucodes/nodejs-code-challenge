import { Injectable } from '@nestjs/common';
import { SendEmailRequest } from 'src/smtp/smtp.types';

@Injectable()
export class SmtpService {
  sendEmail(sendEmailRequest: SendEmailRequest) {
    console.log('Email sent, details:', sendEmailRequest);
  }
}
