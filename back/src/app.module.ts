import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { FlowModule } from './flow/flow.module'
import { NodeModule } from './node/node.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'
import { JwtAuthMiddleware } from './auth/middleware/jwt-auth.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
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
    consumer.apply(JwtAuthMiddleware).forRoutes('project')
  }
}
