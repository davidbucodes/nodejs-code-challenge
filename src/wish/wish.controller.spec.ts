import { Test, TestingModule } from '@nestjs/testing';
import { WishService } from 'src/wish/wish.service';
import { wishes } from '../../test/mocks/data/wish';
import { responseMock } from '../../test/mocks/objects/response';
import { wishServiceMock } from '../../test/mocks/services/wish';
import { WishController } from './wish.controller';

describe('WishController', () => {
  let controller: WishController;
  let service: WishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishController],
      providers: [{ provide: WishService, useValue: wishServiceMock }],
    }).compile();

    controller = module.get<WishController>(WishController);
    service = module.get<WishService>(WishService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/ (POST)', () => {
    describe('error creating wish', () => {
      it('should get error render file', async () => {
        jest.spyOn(service, 'createWish').mockImplementationOnce(() => {
          throw new Error('message');
        });
        const wish = wishes[0];

        await controller.createWish(wish, responseMock);

        expect(service.getCreateWishErrorViewName).toHaveBeenCalledTimes(1);
        expect(service.getCreateWishSuccessViewName).not.toHaveBeenCalled();
      });
    });

    describe('wish created successfully', () => {
      it('should get success render file', async () => {
        const wish = wishes[0];

        await controller.createWish(wish, responseMock);

        expect(service.getCreateWishSuccessViewName).toHaveBeenCalledTimes(1);
        expect(service.getCreateWishErrorViewName).not.toHaveBeenCalled();
      });
    });
  });
});
