import { Controller, Get, Req } from '@nestjs/common';
// import { AuthorizedService } from './authorized.service';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: { email: string }
}

@Controller('authorized')
export class AuthorizedController {
  // constructor(private readonly service: AuthorizedService) {}
  constructor () {}

  @Get()
  async checkAuth(@Req() request: CustomRequest) {
    return 'Hello ' + request['user']?.email + '!'    
  }
}
