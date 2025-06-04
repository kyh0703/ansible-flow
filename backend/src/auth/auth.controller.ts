import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { Request, Response } from 'express'
import appConfig from 'src/config/app.config'
import { CurrentUser } from 'src/user/user.decorator'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { GithubAuthGuard } from './guards/github.guard'
import { GoogleAuthGuard } from './guards/google.guard'
import { JwtRefreshGuard } from './guards/jwt-refresh.guard'
import { JwtAuthGuard } from './guards/jwt.guard'
import { KakaoAuthGuard } from './guards/kakao.guard'
import type { User } from 'generated/client'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto)
    this.setCookieWithRefreshToken(res, refreshToken)
    return { accessToken }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return { message: '로그아웃 완료' }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: User,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = this.authService.generateTokens(
      user.id,
      user.email,
    )
    this.setCookieWithRefreshToken(res, refreshToken)
    return { accessToken }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.oauthLogin(req)
    this.setCookieWithRefreshToken(res, refreshToken)
    res.redirect(
      `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}?token=${accessToken}`,
    )
  }

  // Kakao OAuth
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoAuth() {
    // Kakao Authentication 불러옴
    return
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.oauthLogin(req)
    this.setCookieWithRefreshToken(res, refreshToken)
    res.redirect(
      `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}?token=${accessToken}`,
    )
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubAuth() {
    return
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.oauthLogin(req)
    this.setCookieWithRefreshToken(res, refreshToken)
    res.redirect(
      `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}?token=${accessToken}`,
    )
  }

  // 현재 인증된 사용자 정보 가져오기
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return req.user
  }

  // 리프레시 토큰을 쿠키에 설정하는 헬퍼 메서드
  private setCookieWithRefreshToken(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.env === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    })
  }
}
