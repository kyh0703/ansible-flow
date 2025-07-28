import { Inject, Injectable, Logger } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import authConfig from 'src/config/auth.config'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)

  constructor(
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authCfg.accessTokenSecret ?? '',
    })
  }

  async validate(payload: any) {
    this.logger.log(`Try to validate token: ${payload.sub}`)

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    })

    this.logger.log(`Validated user: ${user?.id}`)

    return user
  }
}
