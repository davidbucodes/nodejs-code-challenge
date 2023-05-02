import { Injectable } from '@nestjs/common';

@Injectable()
export class SantaDataService {
  getMessageErrorViewName() {
    return 'santa-data/message/error';
  }

  getMessageSuccessViewName() {
    return 'santa-data/message/success';
  }
}
