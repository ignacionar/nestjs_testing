import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileProducerService } from './file.producer.service';

@Controller('file')
export class FileController {
  constructor(private readonly service: FileProducerService) {}

  @Get('/:id')
  async name(@Param('id') file: string) {
    await this.service.deleteFile(file);

    return `Deleted file`;
  }
}
