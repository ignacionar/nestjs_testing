import { Controller, Get, Param } from '@nestjs/common';
import { RedismicroserviceService } from './redismicroservice.service';

@Controller('redismicroservice')
export class RedismicroserviceController {
  constructor(private readonly service: RedismicroserviceService) {}

  @Get('/:id')
  async controllerGet(@Param('id') num: number ) {
    return this.service.sendNumber(num)
  }
}
