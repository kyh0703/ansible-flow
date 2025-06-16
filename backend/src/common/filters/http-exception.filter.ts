import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import type { ApiResponse } from '../interfaces/response.interface'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse()

    const status = exception.getStatus()
    const errorResponse = exception.getResponse()

    let message: string | string[] = ''
    let error: string | object

    if (typeof errorResponse === 'object' && errorResponse !== null) {
      if ('message' in errorResponse) {
        message = (errorResponse as any).message
      }
      if ('error' in errorResponse) {
        error = (errorResponse as any).error
      } else {
        error = errorResponse
      }
    } else {
      message = exception.message
      error = exception.name
    }

    const apiResponse: ApiResponse<null> = {
      statusCode: status,
      message,
      error,
      data: null,
    }

    res.status(status).json(apiResponse)
  }
}
