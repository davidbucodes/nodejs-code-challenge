import { SmtpClient } from '../../../src/smtp/smtp.types';

export const smtpClientMock: SmtpClient = {
  sendEmail: jest.fn(),
};
