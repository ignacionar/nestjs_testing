import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HelloMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.send('Hello, this is a middleware function');
    next();
  }
}
