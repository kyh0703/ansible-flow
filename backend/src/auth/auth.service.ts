import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as dayjs from 'dayjs'
import * as ms from 'ms'
import { randomBytes } from 'crypto'
import authConfig from 'src/config/auth.config'
import { PrismaService } from '../prisma/prisma.service'
import { MailService } from '../mail/mail.service'
import { LoginDto } from './dto/login.dto'
import type { OAuthUserDto } from './dto/oauth-user.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
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

  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const resetToken = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1시간 후 만료

    // 기존 토큰들을 모두 사용됨으로 표시
    await this.prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        used: false,
      },
      data: { used: true },
    })

    // 새로운 토큰 생성
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt,
      },
    })

    return resetToken
  }

  async verifyPasswordResetToken(token: string): Promise<{ userId: string }> {
    const resetToken = await this.prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired reset token')
    }

    return { userId: resetToken.userId }
  }

  async resetPassword(
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<void> {
    const { userId } = await this.verifyPasswordResetToken(token)

    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // 사용자 정보 조회
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    })

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.')
    }

    // 토큰을 사용됨으로 표시하고 비밀번호 업데이트를 트랜잭션으로 처리
    await this.prisma.$transaction([
      this.prisma.passwordResetToken.updateMany({
        where: { token },
        data: { used: true },
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      }),
    ])

    // 비밀번호 변경 완료 알림 메일 발송
    try {
      await this.mailService.sendPasswordResetSuccessEmail(user.email)
      this.logger.log(`Password reset success email sent to ${user.email}`)
    } catch (error) {
      this.logger.error(`Failed to send password reset success email to ${user.email}`, error)
      // 메일 발송 실패는 비밀번호 변경을 방해하지 않음
    }
  }
}
