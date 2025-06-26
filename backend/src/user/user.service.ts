import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import type { User } from 'generated/client'

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name)

  constructor(private readonly prisma: PrismaService) {}

  private toUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

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
    return { items: items.map(user => this.toUserDto(user)), total }
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return this.toUserDto(user)
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({ data: createUserDto })
    return this.toUserDto(user)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.update({ where: { id }, data: updateUserDto })
    return this.toUserDto(user)
  }

  async delete(id: string): Promise<UserDto> {
    const user = await this.prisma.user.delete({ where: { id } })
    return this.toUserDto(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }
}
