import { Test, TestingModule } from '@nestjs/testing';
import { smtpClientMock } from '../../test/mocks/clients/smtpClient';
import { SendEmailRequest, SmtpClient } from '../smtp/smtp.types';
import { SMTP_CLIENT } from './smtp.consts';
import { SmtpService } from './smtp.service';

describe('SmtpService', () => {
  let service: SmtpService;
  let client: SmtpClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmtpService,
        {
          provide: SMTP_CLIENT,
          useValue: smtpClientMock,
        },
      ],
    }).compile();

    service = module.get<SmtpService>(SmtpService);
    client = module.get<SmtpClient>(SMTP_CLIENT);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with a client', () => {
      const emailToSend: SendEmailRequest = {
        sendTo: 'sendTo',
        sender: 'sender',
        title: 'title',
        content: 'content',
      };

      service.sendEmail(emailToSend);

      expect(client.sendEmail).toBeCalledTimes(1);
      expect(client.sendEmail).toBeCalledWith(emailToSend);
    });
  });
});
