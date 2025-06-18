import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { OAuthUserDto } from './dto/oauth-user.dto'

describe('AuthService', () => {
  let service: AuthService
  let prisma: PrismaService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            token: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('signed-token'),
          },
        },
        {
          provide: 'authConfig',
          useValue: {
            accessTokenSecret: 'secret',
            accessTokenExpiresIn: '1h',
            refreshTokenSecret: 'refresh-secret',
            refreshTokenExpiresIn: '7d',
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    prisma = module.get<PrismaService>(PrismaService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('loginOrRegisterOAuthUser', () => {
    const table: Array<{
      name: string
      input: OAuthUserDto
      userExists: boolean
    }> = [
      {
        name: '신규 OAuth 유저 생성 및 토큰 발행',
        input: {
          provider: 'github',
          providerId: '123',
          email: 'test@github.user',
          name: 'test',
        },
        userExists: false,
      },
      {
        name: '기존 OAuth 유저 토큰 발행',
        input: {
          provider: 'github',
          providerId: '123',
          email: 'exist@github.user',
          name: 'exist',
        },
        userExists: true,
      },
    ]

    table.forEach(({ name, input, userExists }) => {
      it(name, async () => {
        const mockUser = { id: 'user-id', email: input.email }
        if (userExists) {
          prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser)
        } else {
          prisma.user.findUnique = jest.fn().mockResolvedValue(null)
          prisma.user.create = jest.fn().mockResolvedValue(mockUser)
        }
        prisma.token.create = jest.fn().mockResolvedValue({})

        const result = await service.loginOrRegisterOAuthUser(input)
        expect(result.user).toEqual(mockUser)
        expect(result.accessToken).toBe('signed-token')
        expect(result.refreshToken).toBe('signed-token')
      })
    })
  })
})
