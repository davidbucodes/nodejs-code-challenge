export type SendEmailRequest = {
  sendTo: string;
  sender: string;
  title: string;
  content: string;
};

export interface SmtpClient {
  sendEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
}

export type EnvironmentVariables = {
  SMTP_ACCOUNT_USERNAME: string;
  SMTP_ACCOUNT_PASSWORD: string;
};
