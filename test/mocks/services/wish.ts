import { WishService } from '../../../src/wish/wish.service';

export const wishServiceMock: Partial<WishService> = {
  createWish: jest.fn(),
  getCreateWishErrorViewName: jest.fn(),
  getCreateWishSuccessViewName: jest.fn(),
  sendWishesEmailCron: jest.fn(),
};
