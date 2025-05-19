package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

//counterfeiter:generate . ProjectMiddleware
type ProjectMiddleware interface {
	IsOwnProjects() fiber.Handler
}

type projectMiddleware struct {
	projectsRepository repository.ProjectsRepository
}

func NewProjectMiddleware(
	projectsRepository repository.ProjectsRepository,
) ProjectMiddleware {
	return &projectMiddleware{
		projectsRepository: projectsRepository,
	}
}

func (p *projectMiddleware) IsOwnProjects() fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals("user").(model.User)
		projectID, err := c.ParamsInt("id")
		if err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "invalid project id")
		}

		project, err := p.projectsRepository.FindByID(c.Context(), int64(projectID))
		if err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "invalid project id")
		}
		if project.UserID != user.ID {
			return fiber.NewError(fiber.StatusForbidden, "you are not allowed to access this project")
		}

		return c.Next()
	}
}
