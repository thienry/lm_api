import { Request, Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  /** @inheritdoc */
  catch(
    exception: PrismaClientKnownRequestError | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()

    res.status(500).json({
      path: req.url,
      code: exception['code'],
      message: exception.message,
      timestamp: new Date().toISOString(),
    })
  }
}
