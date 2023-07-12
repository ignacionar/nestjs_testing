import { Controller, Query, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageProducerService: MessageService) {}

  @Get('invoke-message')
  // @Get()
  getInvokeMsg(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);
    return 'Message: ' + msg;
  }
}
