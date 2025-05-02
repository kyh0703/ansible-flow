package repository

import (
	"context"
	"database/sql"

	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
)

type projectsRepository struct {
	db      *sql.DB
	queries *model.Queries
}

func NewProjectsRepository(
	db *sql.DB,
	queries *model.Queries,
) repository.ProjectsRepository {
	return &projectsRepository{
		db:      db,
		queries: queries,
	}
}

func (p *projectsRepository) CreateOne(ctx context.Context, arg model.CreateProjectParams) (model.Project, error) {
	return p.queries.CreateProject(ctx, arg)
}

func (p *projectsRepository) FindByID(ctx context.Context, id int64) (model.Project, error) {
	return p.queries.GetProject(ctx, id)
}

func (p *projectsRepository) UpdateOne(ctx context.Context, arg model.PatchProjectParams) error {
	return p.queries.PatchProject(ctx, arg)
}

func (p *projectsRepository) DeleteOne(ctx context.Context, id int64) error {
	return p.queries.DeleteProject(ctx, id)
}

func (p *projectsRepository) Pagination(ctx context.Context, userID int64, offset int, limit int) ([]model.Project, int64, error) {
	arg := model.PaginationProjectsParams{
		UserID: userID,
		Limit:  int64(limit),
		Offset: int64(offset),
	}

	projects, err := p.queries.PaginationProjects(ctx, arg)
	if err != nil {
		return nil, 0, err
	}

	total, err := p.queries.CountProjects(ctx, userID)
	if err != nil {
		return nil, 0, err
	}

	return projects, total, nil
}
