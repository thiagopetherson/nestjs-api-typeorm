import { MailerService } from '@nestjs-modules/mailer/dist';

export const mailerServiceMock = {
  provide: MailerService,
  useValue: {
    sendMail: jest.fn(), // Método do service
  },
};