import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import appConfig from './config/app.config'
import authConfig from './config/auth.config'
import dbConfig from './config/db.config'
import { FlowModule } from './flow/flow.module'
import { NodeModule } from './node/node.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
      load: [appConfig, dbConfig, authConfig],
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
export class AppModule {}
