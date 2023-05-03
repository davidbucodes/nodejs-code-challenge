import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { Environment, User, UserProfile } from 'src/user/user.types';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Environment>,
  ) {}

  calculateAge(birthdate: string): number {
    return moment().diff(moment(birthdate, 'YYYY/DD/MM'), 'years');
  }

  async getUsers() {
    const result = this.httpService.get<User[]>(
      `${this.getUserApiBaseUrl()}/users.json`,
    );
    return lastValueFrom(result);
  }

  async getUserProfiles() {
    const result = this.httpService.get<UserProfile[]>(
      `${this.getUserApiBaseUrl()}/userProfiles.json`,
    );
    return lastValueFrom(result);
  }

  private getUserApiBaseUrl() {
    return this.configService.get<string>('USER_API_BASE_URL');
  }
}
