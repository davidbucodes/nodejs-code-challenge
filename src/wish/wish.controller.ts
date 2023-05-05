import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WishService } from '../wish/wish.service';
import { CreateWishDto } from '../wish/wish.types';

@Controller('wish')
export class WishController {
  constructor(private wishService: WishService) {}

  @Post()
  async createWish(@Body() createWishDto: CreateWishDto, @Res() res: Response) {
    let errorMessage = '';

    try {
      await this.wishService.createWish(createWishDto);
    } catch (e) {
      errorMessage = e.message;
    }

    if (errorMessage) {
      return res
        .status(400)
        .render(this.wishService.getCreateWishErrorViewName(), {
          errorMessage,
        });
    } else {
      return res.render(this.wishService.getCreateWishSuccessViewName());
    }
  }
}
