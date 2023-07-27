import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RedismicroserviceService {
  constructor(@Inject('NUMBER_SERVICE') private client: ClientProxy) {}

  async sendNumber(num: number) {
    return this.client.send('number', num)
  }
}
