import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class HelloMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

export function HelloMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Hello, this is a middleware`);
  next();
}