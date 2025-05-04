package repository

import (
	"context"
	"database/sql"

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

func (e *edgesRepository) CreateAll(ctx context.Context, arg []model.CreateEdgeParams) ([]model.Edge, error) {
	panic("unimplemented")
}

func (e *edgesRepository) DeleteAll(ctx context.Context, ids []int64) error {
	panic("unimplemented")
}

func (e *edgesRepository) FindByID(ctx context.Context, id int64) (model.Edge, error) {
	panic("unimplemented")
}

func (e *edgesRepository) UpdateAll(ctx context.Context, arg []model.PatchEdgeParams) error {
	panic("unimplemented")
}

func (e *edgesRepository) FindByFlowID(ctx context.Context, flowID int64) ([]model.Edge, error) {
	return e.queries.ListEdgesByFlowID(ctx, flowID)
}
