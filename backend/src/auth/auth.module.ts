import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { MailModule } from '../mail/mail.module'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt.guard'
import { GithubStrategy } from './strategies/github.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { KakaoStrategy } from './strategies/kakao.strategy'

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    MailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('auth.accessTokenSecret'),
        signOptions: {
          expiresIn: config.get<string>('auth.accessTokenExpiresIn'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    KakaoStrategy,
    GithubStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAuthGuard,
    PrismaService,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
