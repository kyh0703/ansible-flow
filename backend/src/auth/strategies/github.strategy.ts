import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import authConfig from 'src/config/auth.config'
import { AuthService } from '../auth.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authCfg: ConfigType<typeof authConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: authCfg.githubId ?? '',
      clientSecret: authCfg.githubSecret ?? '',
      callbackURL: authCfg.githubRedirectURI ?? '',
      scope: ['user:email'],
      passReqToCallback: true,
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    const { id, username, emails, photos } = profile
    const email =
      (emails && emails[0] && emails[0].value) || `${id}@github.user`
    const profileImage = (photos && photos[0] && photos[0].value) || null

    const user = {
      provider: 'github',
      providerId: id,
      email,
      name: username ?? email.split('@')[0],
      profileImage,
    }

    const savedUser = await this.authService.validateOAuthUser(user)

    done(null, savedUser)
  }
}
