import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailRequest } from 'src/smtp/smtp.types';
import { SmtpService } from './smtp.service';

describe('SmtpService', () => {
  let service: SmtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmtpService],
    }).compile();

    service = module.get<SmtpService>(SmtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    beforeEach(() => {
      console.log = jest.fn();
    });

    it('should send an email', () => {
      const emailToSend: SendEmailRequest = {
        sendTo: 'sendTo',
        sender: 'sender',
        title: 'title',
        content: 'content',
      };

      service.sendEmail(emailToSend);

      expect(console.log).toBeCalledTimes(1);
      expect(console.log).toBeCalledWith('Email sent, details:', emailToSend);
    });
  });
});
