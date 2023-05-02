import { Injectable } from '@nestjs/common';
import { SendMessageDto } from 'src/santa-data/santa-data.types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SantaDataService {
  constructor(private readonly userService: UserService) {}

  async sendMessage(message: SendMessageDto) {
    const { data: users } = await this.userService.getUsers();
    const { data: userProfiles } = await this.userService.getUserProfiles();

    console.log(users, userProfiles, message.name);
    const user = users.find((user) => user.username === message.name);
    if (!user) {
      throw new Error(
        "You're are not registered, so we could not deliver you message.",
      );
    }

    const userProfile = userProfiles.find(
      (profile) => profile.userUid === user.uid,
    );

    const age = this.userService.calculateAge(userProfile.birthdate);
    if (age >= 10) {
      throw new Error('Sending a message allowed under 10 years old.');
    }
  }

  getMessageErrorViewName() {
    return 'santa-data/message/error';
  }

  getMessageSuccessViewName() {
    return 'santa-data/message/success';
  }
}
