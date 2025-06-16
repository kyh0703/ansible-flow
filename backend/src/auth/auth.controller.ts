import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { Request, Response } from 'express'
import type { User } from 'generated/client'
import appConfig from 'src/config/app.config'
import authConfig from 'src/config/auth.config'
import { CurrentUser } from 'src/user/user.decorator'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { GithubAuthGuard } from './guards/github.guard'
import { GoogleAuthGuard } from './guards/google.guard'
import { JwtRefreshGuard } from './guards/jwt-refresh.guard'
import { JwtAuthGuard } from './guards/jwt.guard'
import { KakaoAuthGuard } from './guards/kakao.guard'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(
    @Inject(appConfig.KEY)
    private readonly appCfg: ConfigType<typeof appConfig>,

    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,

    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.register(registerDto)
    this.setCookieWithRefreshToken(res, refreshToken)
    return { accessToken }
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
    this.clearCookie(res)
    return { message: '로그아웃 완료' }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: User,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Query('state') state: string,
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.redirect(`${this.authCfg.frontendUrl}`)
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoAuth(@Req() req: Request) {
    return
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(@Res({ passthrough: true }) res: Response) {
    res.redirect(`${this.authCfg.frontendUrl}`)
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
    res.redirect(`${this.authCfg.frontendUrl}`)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: User) {
    return user
  }

  private setCookieWithRefreshToken(res: Response, refreshToken: string) {
    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.appCfg.env === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    })
  }

  private clearCookie(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
  }
}
