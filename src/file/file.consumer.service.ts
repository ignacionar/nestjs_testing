import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs'

@Processor('file-operation-queue')
export class FileConsumerService {

  @Process('delete-file') 
  async fileDeletionJob(job:Job<unknown>) {
    let jobData:any = job.data;

    try {
      fs.unlinkSync(jobData.filePath);
      console.log('File deleted successfully:', jobData.filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    
  }
}
