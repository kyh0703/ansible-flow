import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { EdgeController } from './edge.controller'
import { EdgeService } from './edge.service'
import { ProjectModule } from 'src/project/project.module'

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [EdgeController],
  providers: [EdgeService],
})
export class EdgeModule {}
