import { Controller, Query, Get } from '@nestjs/common';
import { MessageProducerService } from './message.producer.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageProducerService: MessageProducerService) {}

  @Get('invoke-message')
  // @Get()
  getInvokeMsg(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);
    return 'Message: ' + msg;
  }
}
