import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SantaDataService } from 'src/santa-data/santa-data.service';
import { SendMessageDto } from 'src/santa-data/santa-data.types';

@Controller('santa-data')
export class SantaDataController {
  constructor(private santaDataService: SantaDataService) {}

  @Post('message')
  sendMessage(@Body() sendMessageDto: SendMessageDto, @Res() res: Response) {
    console.log(sendMessageDto);
    let isError = false;

    if (isError) {
      return res.render(this.santaDataService.getMessageErrorViewName(), {
        errorDetails: 'General error',
      });
    } else {
      return res.render(this.santaDataService.getMessageSuccessViewName());
    }
  }
}
