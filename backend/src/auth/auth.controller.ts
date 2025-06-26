import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Request, Response } from 'express'
import type { User } from 'generated/client'
import appConfig from 'src/config/app.config'
import authConfig from 'src/config/auth.config'
import { CurrentUser } from 'src/user/user.decorator'
import { MailService } from '../mail/mail.service'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { OAuthUserDto } from './dto/oauth-user.dto'
import {
  RequestPasswordResetDto,
  ResetPasswordDto,
} from './dto/password-reset.dto'
import { RegisterDto } from './dto/register.dto'
import { GithubAuthGuard } from './guards/github.guard'
import { GoogleAuthGuard } from './guards/google.guard'
import { JwtRefreshGuard } from './guards/jwt-refresh.guard'
import { JwtAuthGuard } from './guards/jwt.guard'
import { KakaoAuthGuard } from './guards/kakao.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(
    @Inject(appConfig.KEY)
    private readonly appCfg: ConfigType<typeof appConfig>,
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log(`Register attempt for email: ${registerDto.email}`)
    const { accessToken, refreshToken } =
      await this.authService.register(registerDto)
    this.setCookieWithRefreshToken(res, refreshToken)
    this.logger.log(
      `User ${registerDto.email} registered and logged in successfully`,
    )
    return { accessToken }
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log(`Login attempt for email: ${loginDto.email}`)
    const { accessToken, refreshToken } = await this.authService.login(loginDto)
    this.setCookieWithRefreshToken(res, refreshToken)
    this.logger.log(`Login successful for email: ${loginDto.email}`)
    return { accessToken }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log(`Refresh attempt for user: ${user.email}`)
    this.logger.log(`Refresh successful for user: ${user.email}`)
    return { message: 'Refresh successful' }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies.token
    if (refreshToken) {
      await this.authService.revokeRefreshToken(refreshToken)
      this.clearCookie(res)
    }
    return { message: 'Logged out successfully' }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    return
  }

  private async handleSocialCallback(req: Request, res: Response) {
    const oauthUser = req.user as OAuthUserDto | undefined
    if (!oauthUser) {
      return res.redirect(`${this.authCfg.frontendUrl}/auth/login`)
    }

    const { accessToken, refreshToken } =
      await this.authService.loginOrRegisterOAuthUser(oauthUser)

    this.setCookieWithRefreshToken(res, refreshToken)
    return res.redirect(
      `${this.authCfg.frontendUrl}/auth/callback?token=${accessToken}&expires_in=${this.authCfg.accessTokenExpiresIn}`,
    )
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.handleSocialCallback(req, res)
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  kakaoAuth() {
    return
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.handleSocialCallback(req, res)
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubAuth() {
    return
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.handleSocialCallback(req, res)
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

  @ApiOperation({ summary: '비밀번호 재설정 요청' })
  @ApiResponse({ status: 200, description: '비밀번호 재설정 이메일 발송' })
  @Post('forgot-password')
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    this.logger.log(
      `Password reset request received for email: ${requestPasswordResetDto.email}`,
    )
    const resetToken = await this.authService.generatePasswordResetToken(
      requestPasswordResetDto.email,
    )
    await this.mailService.sendPasswordResetEmail(
      requestPasswordResetDto.email,
      resetToken,
    )
    this.logger.log(
      `Password reset email sent to ${requestPasswordResetDto.email}`,
    )
    return { message: '비밀번호 재설정 이메일이 발송되었습니다.' }
  }

  @ApiOperation({ summary: '비밀번호 재설정' })
  @ApiResponse({ status: 200, description: '비밀번호 재설정 완료' })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
      resetPasswordDto.passwordConfirm,
    )
    return { message: '비밀번호가 성공적으로 재설정되었습니다.' }
  }
}
