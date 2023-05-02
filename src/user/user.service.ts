import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { User, UserProfile } from 'src/user/user.types';

const BASE_URL =
  'https://raw.githubusercontent.com/alj-devops/santa-data/master';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  calculateAge(birthdate: string): number {
    return moment().diff(moment(birthdate, 'YYYY/DD/MM'), 'years');
  }

  async getUsers() {
    const result = this.httpService.get<User[]>(`${BASE_URL}/users.json`);
    return lastValueFrom(result);
  }

  async getUserProfiles() {
    const result = this.httpService.get<UserProfile[]>(
      `${BASE_URL}/userProfiles.json`,
    );
    return lastValueFrom(result);
  }
}
