import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import authConfig from 'src/config/auth.config'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import type { OAuthUserDto } from './dto/oauth-user.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, passwordConfirm, name } = registerDto

    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.')
    }

    const exist = await this.prisma.user.findUnique({ where: { email } })
    if (exist) {
      throw new BadRequestException('이미 가입된 이메일입니다.')
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await this.prisma.user.create({
      data: { email, password: hash, name: name ?? '' },
    })

    return this.generateTokens(newUser.id, newUser.email)
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      )
    }

    const isMatch = await bcrypt.compare(password, user.password ?? '')
    if (!isMatch) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      )
    }

    return this.generateTokens(user.id, user.email)
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.authCfg.refreshTokenSecret ?? '',
      })

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      })
      if (!user) {
        throw new ForbiddenException('접근 리프레시 토큰 에러')
      }

      return this.generateTokens(user.id, user.email)
    } catch (e) {
      console.error(e)
      throw new ForbiddenException('리프레시 토큰이 유효하지 않습니다.')
    }
  }

  async validateOAuthUser(details: OAuthUserDto) {
    const { provider, providerId, email, name } = details

    let user = await this.prisma.user.findUnique({ where: { email } })
    user ??= await this.prisma.user.create({
      data: {
        email,
        name: name ?? email.split('@')[0],
        provider,
        providerId,
      },
    })

    return user
  }

  generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.authCfg.accessTokenSecret ?? '',
      expiresIn: this.authCfg.accessTokenExpiresIn ?? '',
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.authCfg.refreshTokenSecret ?? '',
      expiresIn: this.authCfg.refreshTokenExpiresIn ?? '',
    })

    return { accessToken, refreshToken }
  }
}
