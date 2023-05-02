import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SantaDataService } from 'src/santa-data/santa-data.service';
import { SendMessageDto } from 'src/santa-data/santa-data.types';

@Controller('santa-data')
export class SantaDataController {
  constructor(private santaDataService: SantaDataService) {}

  @Post('message')
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @Res() res: Response,
  ) {
    console.log(sendMessageDto);
    let errorMessage = '';

    try {
      await this.santaDataService.sendMessage(sendMessageDto);
    } catch (e) {
      console.log(e);
      errorMessage = e.message;
    }

    if (errorMessage) {
      return res.render(this.santaDataService.getMessageErrorViewName(), {
        errorDetails: errorMessage,
      });
    } else {
      return res.render(this.santaDataService.getMessageSuccessViewName());
    }
  }
}
