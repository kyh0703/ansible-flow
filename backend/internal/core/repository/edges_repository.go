package repository

import (
	"context"
	"database/sql"

	"github.com/kyh0703/flow/internal/core/domain/entity"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

type edgesRepository struct {
	db      *sql.DB
	queries *model.Queries
}

func NewEdgesRepository(
	db *sql.DB,
	queries *model.Queries,
) repository.EdgesRepository {
	return &edgesRepository{
		db:      db,
		queries: queries,
	}
}

func (e *edgesRepository) CreateOne(ctx context.Context, param entity.Edge) (*entity.Edge, error) {
	// recorder, err := param.ToModel()
	// if err != nil {
	// 	return nil, err
	// }

	// edge, err := e.edgeRecorder.CreateOne(ctx, model.CreateEdgeParams{
	// 	ID:        recorder.ID,
	// 	FlowID:    recorder.FlowID,
	// 	Source:    recorder.Source,
	// 	Target:    recorder.Target,
	// 	Hidden:    recorder.Hidden,
	// 	MarkerEnd: recorder.MarkerEnd,
	// })
	// if err != nil {
	// 	return nil, err
	// }

	// response := param
	// response.ID = edge.ID
	// return &response, nil
	return nil, nil
}

func (e *edgesRepository) FindOne(ctx context.Context, id int64) (*entity.Edge, error) {
	// recorder, err := e.edgesRecorder.FindOne(ctx, id)
	// if err != nil {
	// 	return nil, err
	// }
	// var edge entity.Edge
	// edge.FromModel(&recorder)
	// return &edge, nil
	return nil, nil
}

func (e *edgesRepository) UpdateOne(ctx context.Context, arg entity.Edge) error {
	// var updateEdgeParams model.PatchEdgeParams
	// updateEdgeParams.ID = arg.ID
	// updateEdgeParams.Source = arg.Source
	// updateEdgeParams.Target = arg.Target
	// if arg.Hidden {
	// 	updateEdgeParams.Hidden = int64(1)
	// } else {
	// 	updateEdgeParams.Hidden = int64(0)
	// }
	// markerEnd, err := json.Marshal(arg.MarkerEnd)
	// if err != nil {
	// 	return err
	// }
	// updateEdgeParams.MarkerEnd = string(markerEnd)

	// return e.edgeRecorder.UpdateOne(ctx, updateEdgeParams)
	return nil
}

func (e *edgesRepository) DeleteOne(ctx context.Context, id int64) error {
	return nil
}
