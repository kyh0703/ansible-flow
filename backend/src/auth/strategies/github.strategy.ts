import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_REDIRECT_URI'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    const { id, username, emails, photos } = profile;
    const email = emails && emails[0] && emails[0].value || `${id}@github.user`;
    const profileImage = photos && photos[0] && photos[0].value || null;
    
    const user = {
      provider: 'github',
      providerId: id,
      email,
      name: username || email.split('@')[0],
      profileImage,
    };
    
    const savedUser = await this.authService.validateOAuthUser(user);
    
    done(null, savedUser);
  }
}