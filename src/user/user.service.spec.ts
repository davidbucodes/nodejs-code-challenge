import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { userProfiles, users } from '../../test/mocks/data/user';
import { httpModuleMock } from '../../test/mocks/services/http';
import { User, UserProfile } from '../user/user.types';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpService: HttpService;

  beforeEach(async () => {
    Date.now = jest.fn(() => new Date('2020-01-01T00:00:00.000Z')) as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: HttpService, useValue: httpModuleMock },
      ],
      imports: [ConfigModule.forRoot()],
      exports: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateAge', () => {
    it('should calculate age', async () => {
      const result = service.calculateAge('2000/01/01');
      expect(result).toEqual(20);
    });
  });

  describe('getUsers', () => {
    it('should get users', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(
          () => of({ data: users }) as Observable<AxiosResponse<User[]>>,
        );

      const result = await service.getUsers();

      expect(result).toEqual({ data: users });
    });
  });

  describe('getUserProfiles', () => {
    it('should get user profiles', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(
          () =>
            of({ data: userProfiles }) as Observable<
              AxiosResponse<UserProfile[]>
            >,
        );

      const result = await service.getUserProfiles();

      expect(result).toEqual({ data: userProfiles });
    });
  });
});
