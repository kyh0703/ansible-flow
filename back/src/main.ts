import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // 프론트엔드 서버 주소
    credentials: true,
  })

  // 쿠키 파서 설정
  app.use(cookieParser())

  // 전역 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Ansible Flow API')
    .setDescription('Ansible Flow 백엔드 API 문서')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
