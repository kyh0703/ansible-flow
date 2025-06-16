import { NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req

    this.logger.log(`[REQ] ${method} ${originalUrl} - ${ip}`)

    const now = Date.now()
    res.on('finish', () => {
      const { statusCode } = res
      const contentLength = res.get('content-length')
      const duration = Date.now() - now

      this.logger.log(
        `[RES] ${method} ${originalUrl} - ${statusCode} ${contentLength} - ${ip} - ${duration}ms`,
      )
    })

    next()
  }
}
