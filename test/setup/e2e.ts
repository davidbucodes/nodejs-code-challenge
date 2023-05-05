import { HttpService } from '@nestjs/axios';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { AppModule } from '../../src/app.module';
import { User, UserProfile } from '../../src/user/user.types';
import { userProfiles, users } from '../mocks/data/user';
import { httpModuleMock } from '../mocks/services/http';

let app: NestExpressApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [{ provide: HttpService, useValue: httpModuleMock }],
  }).compile();

  app = moduleFixture.createNestApplication<NestExpressApplication>();
  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.setViewEngine('hbs');

  await app.init();

  const httpService = app.get<HttpService>(HttpService);
  jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(
      () => of({ data: users }) as Observable<AxiosResponse<User[]>>,
    );
  jest
    .spyOn(httpService, 'get')
    .mockImplementationOnce(
      () =>
        of({ data: userProfiles }) as Observable<AxiosResponse<UserProfile[]>>,
    );
});

afterAll(async () => {
  await app.close();
});

export { app };
