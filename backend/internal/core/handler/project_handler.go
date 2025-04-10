package handler

import (
	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"github.com/kyh0703/flow/internal/core/dto/projects"
	"github.com/kyh0703/flow/internal/core/middleware"
	"github.com/kyh0703/flow/internal/pkg/response"
)

//counterfeiter:generate . ProjectHandler
type ProjectHandler interface {
	Handler
	CreateOne(c *fiber.Ctx) error
	FindOne(c *fiber.Ctx) error
	DeleteOne(c *fiber.Ctx) error
	UpdateOne(c *fiber.Ctx) error
}

//counterfeiter:generate . ProjectHandler
type projectHandler struct {
	validate          *validator.Validate
	authMiddleware    middleware.AuthMiddleware
	projectRepository repository.ProjectRepository
}

func NewProjectHandler(
	validate *validator.Validate,
	authMiddleware middleware.AuthMiddleware,
	projectRepository repository.ProjectRepository,
) ProjectHandler {
	return &projectHandler{
		validate:          validate,
		authMiddleware:    authMiddleware,
		projectRepository: projectRepository,
	}
}

func (h *projectHandler) Table() []Mapper {
	return []Mapper{
		Mapping(fiber.MethodPost, "/node", h.authMiddleware.CurrentUser(), h.CreateOne),
		Mapping(fiber.MethodGet, "/node/:id", h.authMiddleware.CurrentUser(), h.FindOne),
		Mapping(fiber.MethodPut, "/node/:id", h.authMiddleware.CurrentUser(), h.UpdateOne),
		Mapping(fiber.MethodDelete, "/node/:id", h.authMiddleware.CurrentUser(), h.DeleteOne),
	}
}

func (h *projectHandler) CreateOne(c *fiber.Ctx) error {
	var req projects.CreateProjectRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := h.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var params model.CreateProjectParams
	copier.Copy(&params, &req)

	user := c.Locals("user").(model.User)
	params.UserID = user.ID

	newProject, err := h.projectRepository.CreateOne(c.Context(), params)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res projects.Response
	copier.Copy(&res, &newProject)
	return response.Success(c, fiber.StatusCreated, res)
}

func (h *projectHandler) FindOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	project, err := h.projectRepository.FindOne(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res projects.Response
	copier.Copy(&res, &project)
	return response.Success(c, fiber.StatusOK, res)
}

func (h *projectHandler) UpdateOne(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (h *projectHandler) DeleteOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := h.projectRepository.DeleteOne(c.Context(), int64(id)); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}
