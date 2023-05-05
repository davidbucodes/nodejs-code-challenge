import { UserService } from '../../../src/user/user.service';

export const userServiceMock: Partial<UserService> = {
  calculateAge: jest.fn(),
  getUserProfiles: jest.fn(),
  getUsers: jest.fn(),
};
