import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { ProjectService } from '../../project/project.service'

@Injectable()
export class ProjectMembershipGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const userId = req.currentUser?.id
    const projectId = req.params.projectId ?? req.body.projectId
    if (!userId || !projectId) {
      throw new ForbiddenException('User or projectId not found')
    }

    const isMember = await this.projectService.isUserMemberOfProject(
      userId,
      projectId,
    )
    if (!isMember) {
      throw new ForbiddenException('You do not have access to this project')
    }
    return true
  }
}
