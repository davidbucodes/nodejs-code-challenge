import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { EnvironmentVariables, User, UserProfile } from '../user/user.types';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  private get userApiBaseUrl() {
    return this.configService.get<string>('USER_API_BASE_URL');
  }

  calculateAge(birthdate: string): number {
    return moment().diff(moment(birthdate, 'YYYY/DD/MM'), 'years');
  }

  async getUsers() {
    const result = this.httpService.get<User[]>(
      `${this.userApiBaseUrl}/users.json`,
    );
    return lastValueFrom(result);
  }

  async getUserProfiles() {
    const result = this.httpService.get<UserProfile[]>(
      `${this.userApiBaseUrl}/userProfiles.json`,
    );
    return lastValueFrom(result);
  }
}
