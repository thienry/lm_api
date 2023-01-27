import { NextFunction, Request, Response } from 'express'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  /** @inheritdoc */
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.get('user-agent') || ''

    res.on('finish', () => {
      this.logger.log(`${req.method} ${req.originalUrl} ${req.statusCode} - ${userAgent} ${req.ip}`)
      next()
    })
  }
}
