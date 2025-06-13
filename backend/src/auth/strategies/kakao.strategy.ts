import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-kakao'
import authConfig from 'src/config/auth.config'
import { AuthService } from '../auth.service'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: authCfg.kakaoId ?? '',
      clientSecret: authCfg.kakaoSecret ?? '',
      callbackURL: authCfg.kakaoRedirectURI ?? '',
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
