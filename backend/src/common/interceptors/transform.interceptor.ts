import {
  HttpStatus,
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import type { ApiResponse } from '../interfaces/response.interface'

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const httpCtx = ctx.switchToHttp()
    const req = httpCtx.getRequest()
    const res = httpCtx.getResponse()

    return next.handle().pipe(
      map((data) => ({
        statusCode: res.statusCode ?? HttpStatus.OK,
        message: 'Success',
        data: data,
        path: req.path,
      })),
    )
  }
}
