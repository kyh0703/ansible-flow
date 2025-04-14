package db

import (
	"context"
	"database/sql"
	_ "embed"
	"fmt"
	"time"

	_ "modernc.org/sqlite"

	"github.com/kyh0703/flow/configs"
	"github.com/kyh0703/flow/internal/core/domain/model"
)

//go:embed schema.sql
var ddl string

func NewDB(config *configs.Config) (*sql.DB, error) {
	dbPath := config.Infra.DB.FilePath
	if dbPath == "" {
		dbPath = ":memory"
	}

	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		fmt.Println("Error opening database:", err)
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if _, err := db.ExecContext(ctx, ddl); err != nil {
		return nil, err
	}

	return db, nil
}

func NewQueries(db *sql.DB) *model.Queries {
	return model.New(db)
}
