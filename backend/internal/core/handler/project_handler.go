package handler

import (
	"database/sql"
	"errors"

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

//counterfeiter:generate . ProjectHandler
type ProjectHandler interface {
	Handler
	CreateOne(c *fiber.Ctx) error
	FindOne(c *fiber.Ctx) error
	DeleteOne(c *fiber.Ctx) error
	UpdateOne(c *fiber.Ctx) error
	FindAll(c *fiber.Ctx) error
}

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
		Mapping(fiber.MethodPost, "/projects",
			h.authMiddleware.CurrentUser(), h.CreateOne),
		Mapping(fiber.MethodGet, "/projects/:id",
			h.authMiddleware.CurrentUser(), h.FindOne),
		Mapping(fiber.MethodPatch, "/projects/:id",
			h.authMiddleware.CurrentUser(), h.UpdateOne),
		Mapping(fiber.MethodDelete, "/projects/:id",
			h.authMiddleware.CurrentUser(), h.DeleteOne),
		Mapping(fiber.MethodGet, "/projects",
			h.authMiddleware.CurrentUser(), h.FindAll),
	}
}

func (h *projectHandler) CreateOne(c *fiber.Ctx) error {
	var req project.CreateProjectRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := h.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var arg model.CreateProjectParams
	copier.Copy(&arg, &req)

	user := c.Locals("user").(model.User)
	arg.UserID = user.ID

	newProject, err := h.projectRepository.CreateOne(c.Context(), arg)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res project.ProjectResponse
	copier.Copy(&res, &newProject)

	return response.Success(c, fiber.StatusCreated, res)
}

func (h *projectHandler) FindOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	finedProject, err := h.projectRepository.FindOne(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res project.ProjectResponse
	copier.Copy(&res, &finedProject)

	return response.Success(c, fiber.StatusOK, res)
}

func (h *projectHandler) UpdateOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var req project.UpdateProjectRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := h.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if _, err := h.projectRepository.FindOne(c.Context(), int64(id)); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return fiber.NewError(fiber.StatusNotFound, err.Error())
		}
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if err := h.projectRepository.UpdateOne(c.Context(), model.PatchProjectParams{
		ID:          int64(id),
		Name:        db.ToNullString(req.Name),
		Description: db.ToNullString(req.Description),
	}); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
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

func (h *projectHandler) FindAll(c *fiber.Ctx) error {
	user := c.Locals("user").(model.User)

	projectList, err := h.projectRepository.GetList(c.Context(), user.ID)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res []project.ProjectResponse
	copier.Copy(&res, &projectList)

	return response.Success(c, fiber.StatusOK, res)
}
