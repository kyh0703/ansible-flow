import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import ms from 'ms'
import authConfig from 'src/config/auth.config'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import type { OAuthUserDto } from './dto/oauth-user.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
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

    const payload = { email: newUser.email, sub: newUser.id }
    const accessToken = this.generateAccessToken(payload)
    const { refreshToken, expiresAt } = this.generateRefreshToken(payload)

    await this.prisma.token.create({
      data: {
        userId: newUser.id,
        refreshToken,
        expiresAt,
      },
    })

    return { accessToken, refreshToken }
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

    const payload = { email: user.email, sub: user.id }
    const accessToken = this.generateAccessToken(payload)
    const { refreshToken, expiresAt } = this.generateRefreshToken(payload)

    await this.saveNewRefreshToken(user.id, refreshToken, expiresAt)

    return { accessToken, refreshToken }
  }

  async refresh(
    userId: string,
    oldRefreshToken: string,
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    const userWithTokens = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { tokens: { where: { refreshToken: oldRefreshToken } } },
    })
    if (!userWithTokens || userWithTokens.tokens.length === 0) {
      await this.revokeAllUserRefreshTokens(userId)
      throw new ForbiddenException('접근 리프레시 토큰 에러')
    }

    const currentTokenRecord = userWithTokens.tokens[0]
    if (currentTokenRecord.expiresAt < new Date()) {
      await this.revokeAllUserRefreshTokens(userId)
      throw new ForbiddenException('접근 리프레시 토큰 에러')
    }

    await this.prisma.token.delete({
      where: { id: currentTokenRecord.id },
    })

    const payload = { email: userWithTokens.email, sub: userWithTokens.id }
    const accessToken = this.generateAccessToken(payload)
    const { refreshToken, expiresAt } = this.generateRefreshToken(payload)

    await this.saveNewRefreshToken(userId, refreshToken, expiresAt)

    return { accessToken, newRefreshToken: refreshToken }
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

  async loginOrRegisterOAuthUser(details: OAuthUserDto) {
    const user = await this.validateOAuthUser(details)
    const payload = { email: user.email, sub: user.id }
    const accessToken = this.generateAccessToken(payload)
    const { refreshToken, expiresAt } = this.generateRefreshToken(payload)
    await this.saveNewRefreshToken(user.id, refreshToken, expiresAt)
    return { user, accessToken, refreshToken }
  }

  private generateAccessToken(payload: { email: string; sub: string }) {
    return this.jwtService.sign(payload, {
      secret: this.authCfg.accessTokenSecret ?? '',
      expiresIn: this.authCfg.accessTokenExpiresIn ?? '',
    })
  }

  private generateRefreshToken(payload: { email: string; sub: string }) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.authCfg.refreshTokenSecret ?? '',
      expiresIn: this.authCfg.refreshTokenExpiresIn ?? '',
    })
    const expiresInMs = ms(this.authCfg.refreshTokenExpiresIn ?? '')
    const expiresAt = dayjs().add(expiresInMs, 'ms').toDate()
    return { refreshToken, expiresAt }
  }

  private async saveNewRefreshToken(
    userId: string,
    refreshToken: string,
    expiresAt: Date,
  ) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

    return this.prisma.token.create({
      data: {
        userId,
        refreshToken: hashedRefreshToken,
        expiresAt,
      },
    })
  }

  // 기존 Refresh Token 무효화
  async revokeRefreshToken(refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.prisma.token.deleteMany({
      where: { refreshToken: hashedRefreshToken },
    })
  }

  // 특정 사용자의 모든 Refresh Token 삭제
  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await this.prisma.token.deleteMany({
      where: { userId },
    })
    this.logger.warn(`Revoked all refresh tokens for user ${userId}`)
  }
}
