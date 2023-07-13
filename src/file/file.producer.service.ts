import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue('file-operation-queue') private queue: Queue) {}

  async deleteFile(fileName: string) {

    let filePath = `/Users/solvd/Desktop/interview_material/nest_testing/src/assets/${fileName}.txt`

    await this.queue.add('delete-file', {
      filePath: filePath
    })
  }
}
