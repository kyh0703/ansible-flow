import { Module } from '@nestjs/common'
import { FlowController } from './flow.controller'
import { FlowService } from './flow.service'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [FlowController],
  providers: [FlowService],
})
export class FlowModule {}
