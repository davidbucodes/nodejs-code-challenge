import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { User, UserProfile } from '../../src/user/user.types';
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

  describe('createWish', () => {
    describe('user not registered', () => {
      it('should throw an error', async () => {
        jest
          .spyOn(userService, 'getUsers')
          .mockResolvedValue({ data: [] } as AxiosResponse<User[]>);
        jest
          .spyOn(userService, 'getUserProfiles')
          .mockResolvedValue({ data: [] } as AxiosResponse<UserProfile[]>);

        expect(async () => await service.createWish(wishes[0])).rejects.toThrow(
          "You're are not registered, so we could not deliver you wish.",
        );
      });
    });

    describe('user not at allowed age', () => {
      it('should throw an error', async () => {
        const wish = wishes[0];
        jest.spyOn(userService, 'getUsers').mockResolvedValue({
          data: [
            {
              uid: 'uid',
              username: wish.name,
            },
          ],
        } as AxiosResponse<User[]>);
        jest.spyOn(userService, 'getUserProfiles').mockResolvedValue({
          data: [
            {
              userUid: 'uid',
              birthdate: 'birthdate',
            },
          ],
        } as AxiosResponse<UserProfile[]>);
        jest.spyOn(userService, 'calculateAge').mockReturnValue(20);

        expect(async () => await service.createWish(wish)).rejects.toThrow(
          'Sending a wish is allowed only under 10 years old.',
        );
      });
    });

    describe('user is valid to create wishes', () => {
      const wish = wishes[0];
      const existingWishAtDatabase = wishes[1];
      const user: User = {
        uid: 'uid',
        username: wish.name,
      };
      const userProfile: UserProfile = {
        userUid: 'uid',
        birthdate: 'birthdate',
        address: 'address',
      };
      const expectedWish = {
        name: user.username,
        address: userProfile.address,
        wish: wish.wish,
      };

      beforeEach(() => {
        jest.spyOn(userService, 'getUsers').mockResolvedValue({
          data: [user],
        } as AxiosResponse<User[]>);
        jest.spyOn(userService, 'getUserProfiles').mockResolvedValue({
          data: [userProfile],
        } as AxiosResponse<UserProfile[]>);
        jest.spyOn(userService, 'calculateAge').mockReturnValue(1);
      });

      it('should create the wish successfully', async () => {
        await service.createWish(wish);

        expect(databaseService.set).toHaveBeenCalledTimes(1);
        expect(databaseService.set).toHaveBeenCalledWith('wishes', [
          expectedWish,
        ]);
      });

      it('should add the wish to the other wishes collection correctly', async () => {
        jest
          .spyOn(databaseService, 'get')
          .mockImplementationOnce(() => [existingWishAtDatabase]);

        await service.createWish(wish);

        expect(databaseService.set).toHaveBeenCalledTimes(1);
        expect(databaseService.set).toHaveBeenCalledWith('wishes', [
          existingWishAtDatabase,
          expectedWish,
        ]);
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
