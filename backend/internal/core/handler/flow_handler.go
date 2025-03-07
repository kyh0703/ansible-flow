package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

//counterfeiter:generate .type flowHandler struct{}

type FlowHandler interface {
	Table() []Mapper
	CreateOne(c *fiber.Ctx) error
	GetOne(c *fiber.Ctx) error
	DeleteOne(c *fiber.Ctx) error
	UpdateOne(c *fiber.Ctx) error
	Undo(c *fiber.Ctx) error
	Redo(c *fiber.Ctx) error
}

type flowHandler struct {
	flowRepository repository.FlowRepository
}

func NewFlowHandler(
	flowRepository repository.FlowRepository,
) FlowHandler {
	return &flowHandler{
		flowRepository: flowRepository,
	}
}

func (f *flowHandler) Table() []Mapper {
	return []Mapper{
		Mapping(fiber.MethodPost, "/flow", f.CreateOne),
		Mapping(fiber.MethodGet, "/flow/:id", f.GetOne),
		Mapping(fiber.MethodPut, "/flow/:id", f.UpdateOne),
		Mapping(fiber.MethodDelete, "/flow/:id", f.DeleteOne),
		Mapping(fiber.MethodPost, "/flow/:id/undo", f.Undo),
		Mapping(fiber.MethodPost, "/flow/:id/redo", f.Redo),
	}
}

func (f *flowHandler) CreateOne(c *fiber.Ctx) error {
	var param model.CreateFlowParams
	if err := c.BodyParser(&param); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	flow, err := f.flowRepository.CreateOne(c.Context(), param)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(flow)
}

func (f *flowHandler) GetOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	flow, err := f.flowRepository.FindOne(c.Context(), int64(id))
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}
	return c.JSON(flow)
}

func (f *flowHandler) UpdateOne(c *fiber.Ctx) error {
	return nil
}

func (f *flowHandler) DeleteOne(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err = f.flowRepository.DeleteOne(c.Context(), int64(id)); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func (f *flowHandler) Redo(c *fiber.Ctx) error {
	return nil
}
