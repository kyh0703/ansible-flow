import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided')
    }
    const token = authHeader.replace('Bearer ', '')
    try {
      const payload = this.jwtService.verify(token)
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      })
      if (!user) throw new UnauthorizedException('User not found')
      req.user = user
      req.currentUser = user
      next()
    } catch (e) {
      throw new UnauthorizedException(`Invalid token ${e.message}`)
    }
  }
}
