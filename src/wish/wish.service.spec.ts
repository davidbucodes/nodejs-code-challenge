import { Test, TestingModule } from '@nestjs/testing';
import { email } from '../../test/mocks/data/email';
import { wishes } from '../../test/mocks/data/wish';
import { databaseServiceMock } from '../../test/mocks/services/database';
import { smtpServiceMock } from '../../test/mocks/services/smtp';
import { userServiceMock } from '../../test/mocks/services/user';
import { DatabaseService } from '../keyValueDatabase/keyValueDatabase.service';
import { SmtpService } from '../smtp/smtp.service';
import { UserService } from '../user/user.service';
import { WishService } from './wish.service';

describe('WishService', () => {
  let service: WishService;
  let databaseService: DatabaseService;
  let smtpService: SmtpService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishService,
        { provide: DatabaseService, useValue: databaseServiceMock },
        { provide: SmtpService, useValue: smtpServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();

    service = module.get<WishService>(WishService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    smtpService = module.get<SmtpService>(SmtpService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWishesEmailCron', () => {
    describe('no unsent wishes', () => {
      it('should not send wishes email cron', async () => {
        const result = await service.sendWishesEmailCron();

        expect(smtpService.sendEmail).not.toHaveBeenCalled();
      });
    });

    describe('unsent wishes available', () => {
      it('should send wishes email', async () => {
        jest.spyOn(databaseService, 'get').mockImplementationOnce(() => wishes);

        await service.sendWishesEmailCron();

        expect(smtpService.sendEmail).toHaveBeenCalledTimes(1);
        expect(smtpService.sendEmail).toHaveBeenCalledWith(email);
      });

      it('should empty saved wishes from database', async () => {
        jest.spyOn(databaseService, 'get').mockImplementationOnce(() => wishes);

        await service.sendWishesEmailCron();

        expect(databaseService.set).toHaveBeenCalledTimes(1);
        expect(databaseService.set).toHaveBeenCalledWith('wishes', []);
      });
    });
  });

  describe('getCreateWishErrorViewName', () => {
    it('should get create wish error view name', () => {
      const result = service.getCreateWishErrorViewName();

      expect(result).toEqual('wish/create/error');
    });
  });

  describe('getCreateWishSuccessViewName', () => {
    it('should get create wish success view name', () => {
      const result = service.getCreateWishSuccessViewName();

      expect(result).toEqual('wish/create/success');
    });
  });

  describe('generateWishesEmail', () => {
    it('should generate wishes email', () => {
      const result = service['generateWishesEmail'](wishes);

      expect(result).toEqual(email);
    });
  });
});
