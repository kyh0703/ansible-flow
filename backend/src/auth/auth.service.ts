import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { OAuthUserDto } from './dto/oauth-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
    const user = await this.prisma.user.create({
      data: { email, password: hash, name },
    })
    return this.generateTokens(user.id, user.email)
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      )
    }
    const isMatch = await bcrypt.compare(password, user?.password)
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
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      })

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      })
      if (!user) throw new ForbiddenException('접근 리프레시 토큰 에러')

      return this.generateTokens(user.id, user.email)
    } catch (e) {
      throw new ForbiddenException('리프레시 토큰이 유효하지 않습니다.')
    }
  }

  async oauthLogin(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('OAuth 인증 실패')
    }

    const { provider, providerId, email, name, profileImage } = req.user

    // 이미 사용자가 존재하는지 확인
    let user = await this.prisma.user.findUnique({ where: { email } })

    // 사용자가 없는 경우 생성
    user ??= await this.prisma.user.create({
      data: {
        email,
        name: name ?? email.split('@')[0],
        profileImage,
      },
    })

    return this.generateTokens(user.id, user.email)
  }

  async validateOAuthUser(details: OAuthUserDto) {
    const { provider, providerId, email, name, profileImage } = details

    // 이미 사용자가 존재하는지 확인
    let user = await this.prisma.user.findUnique({ where: { email } })

    // 사용자가 없는 경우 생성
    user ??= await this.prisma.user.create({
      data: {
        email,
        name: name ?? email.split('@')[0],
        profileImage,
      },
    })

    return user
  }

  generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    })

    return { accessToken, refreshToken }
  }
}
