import { Module } from '@nestjs/common'
import { EdgeController } from './edge.controller'
import { EdgeService } from './edge.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [EdgeController],
  providers: [EdgeService],
})
export class EdgeModule {}
