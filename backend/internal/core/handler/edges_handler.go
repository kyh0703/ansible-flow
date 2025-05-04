package handler

import (
	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"github.com/kyh0703/flow/internal/core/middleware"
)

//counterfeiter:generate . EdgesHandler
type EdgesHandler interface {
	Handler
	CreateList(c *fiber.Ctx) error
	FindOne(c *fiber.Ctx) error
	DeleteList(c *fiber.Ctx) error
	UpdateList(c *fiber.Ctx) error
}

type edgesHandler struct {
	validate        *validator.Validate
	authMiddleware  middleware.AuthMiddleware
	edgesRepository repository.EdgesRepository
}

func NewEdgesHandler(
	validate *validator.Validate,
	authMiddleware middleware.AuthMiddleware,
	edgesRepository repository.EdgesRepository,
) EdgesHandler {
	return &edgesHandler{
		validate:        validate,
		authMiddleware:  authMiddleware,
		edgesRepository: edgesRepository,
	}
}

func (e *edgesHandler) Table() []Mapper {
	return []Mapper{
		Mapping(
			fiber.MethodPost,
			"projects/:projectId/flows/:flowId/edges",
			e.authMiddleware.CurrentUser(),
			e.CreateList,
		),
		Mapping(
			fiber.MethodGet,
			"projects/:projectId/flows/:flowId/edges/:id",
			e.authMiddleware.CurrentUser(),
			e.FindOne,
		),
		Mapping(
			fiber.MethodPatch,
			"projects/:projectId/flows/:flowId/edges",
			e.authMiddleware.CurrentUser(),
			e.UpdateList,
		),
		Mapping(
			fiber.MethodDelete,
			"projects/:projectId/flows/:flowId/edges",
			e.authMiddleware.CurrentUser(),
			e.DeleteList,
		),
	}
}

func (e *edgesHandler) CreateList(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (e *edgesHandler) FindOne(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (e *edgesHandler) DeleteList(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (e *edgesHandler) UpdateList(c *fiber.Ctx) error {
	panic("unimplemented")
}
