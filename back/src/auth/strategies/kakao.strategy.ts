import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-kakao'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_CLIENT_ID')!,
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('KAKAO_REDIRECT_URI')!,
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, username, _json } = profile
    const email = _json?.kakao_account?.email ?? `${id}@kakao.user`
    const profileImage =
      _json?.kakao_account?.profile?.profile_image_url ?? null

    const user = {
      provider: 'kakao',
      providerId: id,
      email,
      name: username ?? email.split('@')[0],
      profileImage,
    }

    const savedUser = await this.authService.validateOAuthUser(user)
    return savedUser
  }
}
