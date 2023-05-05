import { SmtpService } from 'src/smtp/smtp.service';

export const smtpServiceMock: Partial<SmtpService> = {
  sendEmail: jest.fn(),
};
