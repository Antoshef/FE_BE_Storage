import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: Function) {
    this.logger.log(`Request: ${req.method} ${req.url}`);
    next();
  }
}
