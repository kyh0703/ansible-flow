package handler

import (
	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/kyh0703/flow/internal/core/middleware"
)

//counterfeiter:generate . NodesHandler
type NodesHandler interface {
	Handler
	CreateList(c *fiber.Ctx) error
	FindOne(c *fiber.Ctx) error
	DeleteList(c *fiber.Ctx) error
	UpdateList(c *fiber.Ctx) error
}

type nodesHandler struct {
	validate       *validator.Validate
	authMiddleware middleware.AuthMiddleware
}

func NewNodesHandler(
	validate *validator.Validate,
	authMiddleware middleware.AuthMiddleware,
) NodesHandler {
	return &nodesHandler{
		validate:       validate,
		authMiddleware: authMiddleware,
	}
}

func (n *nodesHandler) Table() []Mapper {
	return []Mapper{
		Mapping(
			fiber.MethodPost,
			"projects/:projectId/flows/:flowId/nodes",
			n.authMiddleware.CurrentUser(),
			n.CreateList,
		),
		Mapping(
			fiber.MethodGet,
			"projects/:projectId/flows/:flowId/nodes/:id",
			n.authMiddleware.CurrentUser(),
			n.FindOne,
		),
		Mapping(
			fiber.MethodPatch,
			"projects/:projectId/flows/:flowId/nodes/:id",
			n.authMiddleware.CurrentUser(),
			n.UpdateList,
		),
		Mapping(
			fiber.MethodDelete,
			"projects/:projectId/flows/:flowId/nodes/:id",
			n.authMiddleware.CurrentUser(),
			n.DeleteList,
		),
	}
}

func (n *nodesHandler) CreateList(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (n *nodesHandler) FindOne(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (n *nodesHandler) DeleteList(c *fiber.Ctx) error {
	panic("unimplemented")
}

func (n *nodesHandler) UpdateList(c *fiber.Ctx) error {
	panic("unimplemented")
}
