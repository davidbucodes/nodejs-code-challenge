import { SendEmailRequest } from '../../../src/smtp/smtp.types';

export const email: SendEmailRequest = {
  content: `These are the new wishes:
Wish number #1
Name: name1
Address: address1
Wish content:
wish1
---
Wish number #2
Name: name2
Address: address2
Wish content:
wish2
---
Wish number #3
Name: name3
Address: address3
Wish content:
wish3`,
  sendTo: 'santa@northpole.com',
  sender: '"North Pole" <do_not_reply@northpole.com>',
  title: 'New wishes arrived!',
};
