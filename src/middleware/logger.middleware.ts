import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Request...
      Url: ${req.originalUrl} 
      Method: ${req.method} 
      Query:  ${JSON.stringify(req.query)}`,
    );
    next();
  }
}
