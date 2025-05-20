package handler

import (
	"database/sql"
	"errors"
	"math"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"github.com/kyh0703/flow/internal/core/dto/project"
	"github.com/kyh0703/flow/internal/core/middleware"
	"github.com/kyh0703/flow/internal/pkg/db"
	"github.com/kyh0703/flow/internal/pkg/response"
)

//counterfeiter:generate . ProjectsHandler
type ProjectsHandler interface {
	Handler
	CreateOne(c *fiber.Ctx) error
	FindOne(c *fiber.Ctx) error
	DeleteOne(c *fiber.Ctx) error
	UpdateOne(c *fiber.Ctx) error
	Pagination(c *fiber.Ctx) error
}

type projectsHandler struct {
	validate           *validator.Validate
	authMiddleware     middleware.AuthMiddleware
	projectMiddleware  middleware.ProjectMiddleware
	projectsRepository repository.ProjectsRepository
}

func NewProjectsHandler(
	validate *validator.Validate,
	authMiddleware middleware.AuthMiddleware,
	projectMiddleware middleware.ProjectMiddleware,
	projectsRepository repository.ProjectsRepository,
) ProjectsHandler {
	return &projectsHandler{
		validate:           validate,
		authMiddleware:     authMiddleware,
		projectMiddleware:  projectMiddleware,
		projectsRepository: projectsRepository,
	}
}

func (p *projectsHandler) Table() []Mapper {
	return []Mapper{
		Mapping(
			fiber.MethodPost,
			"/projects",
			p.authMiddleware.CurrentUser(),
			p.CreateOne,
		),
		Mapping(
			fiber.MethodGet,
			"/projects/:id",
			p.authMiddleware.CurrentUser(),
			p.projectMiddleware.IsOwnProjects(),
			p.FindOne,
		),
		Mapping(
			fiber.MethodPatch,
			"/projects/:id",
			p.authMiddleware.CurrentUser(),
			p.projectMiddleware.IsOwnProjects(),
			p.UpdateOne,
		),
		Mapping(
			fiber.MethodDelete,
			"/projects/:id",
			p.authMiddleware.CurrentUser(),
			p.projectMiddleware.IsOwnProjects(),
			p.DeleteOne,
		),
		Mapping(
			fiber.MethodGet,
			"/projects",
			p.authMiddleware.CurrentUser(),
			p.Pagination,
		),
	}
}

func (p *projectsHandler) CreateOne(c *fiber.Ctx) error {
	var req project.CreateDto
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := p.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var arg model.CreateProjectParams
	copier.Copy(&arg, &req)

	user := c.Locals("user").(model.User)
	arg.UserID = user.ID

	newProject, err := p.projectsRepository.CreateOne(c.Context(), arg)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res project.ProjectDto
	copier.Copy(&res, &newProject)

	return response.Success(c, fiber.StatusCreated, res)
}

func (p *projectsHandler) FindOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	finedProject, err := p.projectsRepository.FindByID(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res project.ProjectDto
	copier.Copy(&res, &finedProject)

	return response.Success(c, fiber.StatusOK, res)
}

func (p *projectsHandler) UpdateOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var req project.UpdateProjectDto
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := p.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if _, err := p.projectsRepository.FindByID(c.Context(), int64(id)); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return fiber.NewError(fiber.StatusNotFound, err.Error())
		}
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if err := p.projectsRepository.UpdateOne(c.Context(), model.PatchProjectParams{
		ID:          int64(id),
		Name:        db.ToNullString(req.Name),
		Description: db.ToNullString(req.Description),
	}); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func (p *projectsHandler) DeleteOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := p.projectsRepository.DeleteOne(c.Context(), int64(id)); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func (p *projectsHandler) Pagination(c *fiber.Ctx) error {
	var req project.PaginationProjectDto
	if err := c.QueryParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := p.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	user := c.Locals("user").(model.User)
	offset := (req.Page - 1) * req.PageSize

	projectList, total, err := p.projectsRepository.Pagination(c.Context(), user.ID, offset, req.PageSize)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var projects []project.ProjectDto
	copier.Copy(&projects, &projectList)

	page := req.Page
	totalPages := int64(math.Ceil(float64(total) / float64(req.PageSize)))

	return response.Success(c, fiber.StatusOK, fiber.Map{
		"items": projects,
		"meta": fiber.Map{
			"total":      total,
			"skip":       offset,
			"take":       req.PageSize,
			"hasMore":    int64(offset+req.PageSize) < total,
			"page":       page,
			"totalPages": totalPages,
		},
	})
}
