import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    if (!!req.currentUser) {
      return !!data ? req.currentUser[data] : req.currentUser
    }
  },
)
