package repository

import (
	"context"
	"encoding/json"

	"github.com/kyh0703/flow/internal/core/domain/entity"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"github.com/kyh0703/flow/internal/core/recorder"
)

type edgeRepository struct {
	edgeRecorder recorder.EdgeRecorder
}

func NewEdgeRepository(
	edgeRecorder recorder.EdgeRecorder,
) repository.EdgeRepository {
	return &edgeRepository{
		edgeRecorder: edgeRecorder,
	}
}

func (e *edgeRepository) CreateOne(ctx context.Context, param entity.Edge) (*entity.Edge, error) {
	recorder, err := param.ToModel()
	if err != nil {
		return nil, err
	}

	edge, err := e.edgeRecorder.CreateOne(ctx, model.CreateEdgeParams{
		ID:        recorder.ID,
		FlowID:    recorder.FlowID,
		Source:    recorder.Source,
		Target:    recorder.Target,
		Hidden:    recorder.Hidden,
		MarkerEnd: recorder.MarkerEnd,
	})
	if err != nil {
		return nil, err
	}

	response := param
	response.ID = edge.ID
	return &response, nil
}

func (e *edgeRepository) FindOne(ctx context.Context, id int64) (*entity.Edge, error) {
	recorder, err := e.edgeRecorder.FindOne(ctx, id)
	if err != nil {
		return nil, err
	}
	var edge entity.Edge
	edge.FromModel(&recorder)
	return &edge, nil
}

func (e *edgeRepository) UpdateOne(ctx context.Context, arg entity.Edge) error {
	var updateEdgeParams model.UpdateEdgeParams
	updateEdgeParams.ID = arg.ID
	updateEdgeParams.Source = arg.Source
	updateEdgeParams.Target = arg.Target
	if arg.Hidden {
		updateEdgeParams.Hidden = int64(1)
	} else {
		updateEdgeParams.Hidden = int64(0)
	}
	markerEnd, err := json.Marshal(arg.MarkerEnd)
	if err != nil {
		return err
	}
	updateEdgeParams.MarkerEnd = string(markerEnd)

	return e.edgeRecorder.UpdateOne(ctx, updateEdgeParams)
}

func (e *edgeRepository) DeleteOne(ctx context.Context, id int64) error {
	return e.edgeRecorder.DeleteOne(ctx, id)
}
