import { Module } from '@nestjs/common';
import { MessageConsumer } from './message.consumer';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  providers: [MessageConsumer, MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
