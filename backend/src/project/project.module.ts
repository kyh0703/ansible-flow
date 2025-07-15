import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { ProjectMembershipGuard } from './guards/project-membership.guard'

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectMembershipGuard],
  exports: [ProjectService, ProjectMembershipGuard],
})
export class ProjectModule {}
