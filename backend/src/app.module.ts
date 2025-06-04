import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './auth/middleware/auth.middleware'
import { FlowModule } from './flow/flow.module'
import { NodeModule } from './node/node.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'
import appConfig from './config/app.config'
import dbConfig from './config/db.config'
import jwtConfig from './config/jwt.config'
import oauthConfig from './config/oauth.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
      load: [appConfig, dbConfig, jwtConfig, oauthConfig],
    }),
    AuthModule,
    ProjectModule,
    FlowModule,
    NodeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('project')
  }
}
