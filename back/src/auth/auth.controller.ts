import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
  HttpCode,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guards/jwt.guard'
import { GoogleAuthGuard } from './guards/google.guard'
import { KakaoAuthGuard } from './guards/kakao.guard'
import { GithubAuthGuard } from './guards/github.guard'
import { JwtRefreshGuard } from './guards/jwt-refresh.guard'
import { Response, Request } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      user.userId,
      user.email,
    )
    this.setCookieWithRefreshToken(res, refreshToken)
    return { accessToken }
  }

  // Google OAuth
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // Google Authentication 불러옴 - Guard가 처리
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
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${accessToken}`,
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
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${accessToken}`,
    )
  }

  // Github OAuth
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
      `${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${accessToken}`,
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
      secure: this.configService.get('NODE_ENV') === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    })
  }
}
