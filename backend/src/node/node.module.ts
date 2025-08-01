import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { NodeController } from './node.controller'
import { NodeService } from './node.service'
import { ProjectModule } from 'src/project/project.module'

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
