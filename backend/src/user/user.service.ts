import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import type { User } from 'generated/client'
import { randomBytes } from 'crypto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name)

  constructor(private readonly prisma: PrismaService) {}

  async pagination(params: { skip: number; take: number }) {
    const { skip, take } = params
    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ])
    return { items, total }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async generatePasswordResetToken(email: string): Promise<string> {
    const user = await this.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const resetToken = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1시간 후 만료

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verificationCode: resetToken,
        expiresAt,
      },
    })

    return resetToken
  }

  async verifyPasswordResetToken(token: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        verificationCode: token,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token')
    }

    return user
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.verifyPasswordResetToken(token)
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        verificationCode: null,
        expiresAt: null,
      },
    })
  }
}
