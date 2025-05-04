package handler

import (
	"database/sql"
	"errors"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/copier"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"github.com/kyh0703/flow/internal/core/dto/flow"
	"github.com/kyh0703/flow/internal/core/middleware"
	"github.com/kyh0703/flow/internal/pkg/db"
	"github.com/kyh0703/flow/internal/pkg/response"
)

//counterfeiter:generate . FlowsHandler
type FlowsHandler interface {
	Table() []Mapper
	CreateOne(c *fiber.Ctx) error
	FindOne(c *fiber.Ctx) error
	DeleteOne(c *fiber.Ctx) error
	UpdateOne(c *fiber.Ctx) error
	Pagination(c *fiber.Ctx) error
	FindStructure(c *fiber.Ctx) error
}

type flowsHandler struct {
	validate        *validator.Validate
	authMiddleware  middleware.AuthMiddleware
	flowsRepository repository.FlowsRepository
	nodesRepository repository.NodesRepository
	edgesRepository repository.EdgesRepository
}

func NewFlowsHandler(
	validate *validator.Validate,
	authMiddleware middleware.AuthMiddleware,
	flowsRepository repository.FlowsRepository,
	nodesRepository repository.NodesRepository,
	edgesRepository repository.EdgesRepository,
) FlowsHandler {
	return &flowsHandler{
		validate:        validate,
		authMiddleware:  authMiddleware,
		flowsRepository: flowsRepository,
		nodesRepository: nodesRepository,
		edgesRepository: edgesRepository,
	}
}

func (f *flowsHandler) Table() []Mapper {
	return []Mapper{
		Mapping(
			fiber.MethodPost,
			"projects/:projectId/flows",
			f.authMiddleware.CurrentUser(),
			f.CreateOne,
		),
		Mapping(
			fiber.MethodGet,
			"projects/:projectId/flows/:id",
			f.authMiddleware.CurrentUser(),
			f.FindOne,
		),
		Mapping(
			fiber.MethodPatch,
			"projects/:projectId/flows/:id",
			f.authMiddleware.CurrentUser(),
			f.UpdateOne,
		),
		Mapping(
			fiber.MethodDelete,
			"projects/:projectId/flows/:id",
			f.authMiddleware.CurrentUser(),
			f.DeleteOne,
		),
		Mapping(
			fiber.MethodGet,
			"projects/:projectId/flows",
			f.authMiddleware.CurrentUser(),
			f.Pagination,
		),
		Mapping(
			fiber.MethodGet,
			"projects/:projectId/flows/:id/structure",
			f.authMiddleware.CurrentUser(),
			f.FindStructure,
		),
	}
}

func (f *flowsHandler) CreateOne(c *fiber.Ctx) error {
	var req flow.CreateFlowDto
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := f.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var params model.CreateFlowParams
	copier.Copy(&params, &req)

	newFlow, err := f.flowsRepository.CreateOne(c.Context(), params)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var res flow.FlowDto
	copier.Copy(&res, &newFlow)

	return response.Success(c, fiber.StatusCreated, res)
}

func (f *flowsHandler) FindOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	finedFlow, err := f.flowsRepository.FindByID(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	var res flow.FlowDto
	copier.Copy(&res, &finedFlow)

	return response.Success(c, fiber.StatusOK, res)
}

func (f *flowsHandler) UpdateOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var req flow.UpdateFlowDto
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := f.validate.Struct(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if _, err := f.flowsRepository.FindByID(c.Context(), int64(id)); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return fiber.NewError(fiber.StatusNotFound, err.Error())
		}
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if err := f.flowsRepository.UpdateOne(c.Context(), model.PatchFlowParams{
		ID:          int64(id),
		Name:        db.ToNullString(req.Name),
		Description: db.ToNullString(req.Description),
	}); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func (f *flowsHandler) DeleteOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err = f.flowsRepository.DeleteOne(c.Context(), int64(id)); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func (f *flowsHandler) Pagination(c *fiber.Ctx) error {
	return nil
}

func (f *flowsHandler) FindStructure(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	nodes, err := f.nodesRepository.FindByFlowID(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	edges, err := f.edgesRepository.FindByFlowID(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return response.Success(c, fiber.StatusOK, struct {
		Nodes []model.Node `json:"nodes"`
		Edges []model.Edge `json:"edges"`
	}{
		Nodes: nodes,
		Edges: edges,
	})
}
