package repository

import (
	"context"
	"database/sql"

	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

type flowsRepository struct {
	db      *sql.DB
	queries *model.Queries
}

func NewFlowsRepository(
	db *sql.DB,
	queries *model.Queries,
) repository.FlowsRepository {
	return &flowsRepository{
		db:      db,
		queries: queries,
	}
}

func (f *flowsRepository) CreateOne(ctx context.Context, arg model.CreateFlowParams) (model.Flow, error) {
	return f.queries.CreateFlow(ctx, arg)
}

func (f *flowsRepository) FindByID(ctx context.Context, id int64) (model.Flow, error) {
	return f.queries.GetFlow(ctx, id)
}

func (f *flowsRepository) UpdateOne(ctx context.Context, arg model.PatchFlowParams) error {
	return f.queries.PatchFlow(ctx, arg)
}

func (f *flowsRepository) DeleteOne(ctx context.Context, id int64) error {
	return f.queries.DeleteFlow(ctx, id)
}

func (f *flowsRepository) Pagination(ctx context.Context, projectID int64, offset int, limit int) ([]model.Flow, int64, error) {
	arg := model.PaginationFlowsParams{
		ProjectID: projectID,
		Limit:     int64(limit),
		Offset:    int64(offset),
	}

	flows, err := f.queries.PaginationFlows(ctx, arg)
	if err != nil {
		return nil, 0, err
	}

	total, err := f.queries.CountFlows(ctx, projectID)
	if err != nil {
		return nil, 0, err
	}

	return flows, total, nil
}
