import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import authConfig from 'src/config/auth.config'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refreshToken = request?.cookies?.token
          if (!refreshToken) {
            return null
          }
          return refreshToken
        },
      ]),
      secretOrKey: authCfg.refreshTokenSecret ?? '',
      ignoreExpiration: false,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req?.cookies?.token
    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken,
    }
  }
}
