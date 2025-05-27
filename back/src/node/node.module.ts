import { Module } from '@nestjs/common'
import { NodeController } from './node.controller'
import { NodeService } from './node.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
