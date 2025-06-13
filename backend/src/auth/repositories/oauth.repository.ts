import { Injectable } from '@nestjs/common'
import type { OauthState } from 'generated/client'
import type { IOAuthRepository } from '../interfaces/oauth.repository'
import type { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class OAuthRepository implements IOAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<OauthState | null> {
    return this.prisma.oauthState.findUnique({ where: { id } })
  }

  create(state: Omit<OauthState, 'id'>): Promise<OauthState> {
    return this.prisma.oauthState.create({ data: state })
  }

  delete(id: string): Promise<OauthState> {
    return this.prisma.oauthState.delete({ where: { id } })
  }
}
