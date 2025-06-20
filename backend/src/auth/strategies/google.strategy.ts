import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import authConfig from 'src/config/auth.config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: authCfg.googleId ?? '',
      clientSecret: authCfg.googleSecret ?? '',
      callbackURL: authCfg.googleRedirectURI ?? '',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, displayName, photos } = profile

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: displayName,
      profileImage: photos && photos.length > 0 ? photos[0].value : null,
    }

    done(null, user)
  }
}
