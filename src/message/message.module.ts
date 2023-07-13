import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MessageConsumer } from './message.consumer.service';
import { MessageController } from './message.controller';
import { MessageProducerService } from './message.producer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [MessageConsumer, MessageProducerService],
  controllers: [MessageController],
})
export class MessageModule {}
