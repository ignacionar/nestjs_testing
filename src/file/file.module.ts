import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FileConsumerService } from './file.consumer.service';
import { FileController } from './file.controller';
import { FileProducerService } from './file.producer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'file-operation-queue'
    })
  ],
  controllers: [FileController],
  providers: [FileConsumerService, FileProducerService]
})
export class FileModule {}
