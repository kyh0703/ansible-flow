import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import appConfig from './config/app.config'
import authConfig from './config/auth.config'
import dbConfig from './config/db.config'
import { validate } from './config/env.validation'
import { FlowModule } from './flow/flow.module'
import { NodeModule } from './node/node.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        timestamp: true,
        redact: [
          'req.headers',
          'req.remoteAddress',
          'req.remotePort',
          'res.headers',
        ],
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, authConfig],
      validate,
      validationSchema: {
        abortEarly: true,
      },
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
