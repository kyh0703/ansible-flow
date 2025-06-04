import { ProjectMembershipGuard } from './project-membership.guard'
import { ExecutionContext, ForbiddenException } from '@nestjs/common'

describe('ProjectMembershipGuard', () => {
  let guard: ProjectMembershipGuard

  it('should allow access if user is a member of the project', async () => {
    const mockProjectService = {
      isUserMemberOfProject: jest.fn().mockResolvedValue(true),
    }
    guard = new ProjectMembershipGuard(mockProjectService as any)

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 'user-1' },
          params: { projectId: 'project-1' },
        }),
      }),
    } as unknown as ExecutionContext

    await expect(guard.canActivate(context)).resolves.toBe(true)
  })

  it('should throw ForbiddenException if user is not a member', async () => {
    const mockProjectService = {
      isUserMemberOfProject: jest.fn().mockResolvedValue(false),
    }
    guard = new ProjectMembershipGuard(mockProjectService as any)

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 'user-1' },
          params: { projectId: 'project-1' },
        }),
      }),
    } as unknown as ExecutionContext

    await expect(guard.canActivate(context)).rejects.toThrow(ForbiddenException)
  })
})
