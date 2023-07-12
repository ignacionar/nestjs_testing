import { Process, Processor } from "@nestjs/bull";
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer { 
  @Process('message-job')
  readOperationJob(job: Job<unknown>) {
    // console.log(job);

    // Consumer logged data from Queue
    console.log(job.data);
  }
}