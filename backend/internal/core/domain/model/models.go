// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package model

import (
	"database/sql"
)

type Edge struct {
	ID        int64          `json:"id"`
	Uuid      string         `json:"uuid"`
	FlowID    int64          `json:"flowId"`
	Source    string         `json:"source"`
	Target    string         `json:"target"`
	Type      string         `json:"type"`
	Label     string         `json:"label"`
	Hidden    int64          `json:"hidden"`
	MarkerEnd string         `json:"markerEnd"`
	UpdateAt  sql.NullString `json:"updateAt"`
	CreateAt  sql.NullString `json:"createAt"`
}

type Flow struct {
	ID          int64          `json:"id"`
	ProjectID   int64          `json:"projectId"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	UpdateAt    sql.NullString `json:"updateAt"`
	CreateAt    sql.NullString `json:"createAt"`
}

type Node struct {
	ID          int64          `json:"id"`
	Uuid        string         `json:"uuid"`
	FlowID      int64          `json:"flowId"`
	Type        string         `json:"type"`
	Position    interface{}    `json:"position"`
	Styles      interface{}    `json:"styles"`
	Width       int64          `json:"width"`
	Height      int64          `json:"height"`
	Hidden      int64          `json:"hidden"`
	Description string         `json:"description"`
	UpdateAt    sql.NullString `json:"updateAt"`
	CreateAt    sql.NullString `json:"createAt"`
}

type Project struct {
	ID          int64          `json:"id"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	UpdateAt    sql.NullString `json:"updateAt"`
	CreateAt    sql.NullString `json:"createAt"`
}

type Token struct {
	ID           int64          `json:"id"`
	UserID       int64          `json:"userId"`
	RefreshToken string         `json:"refreshToken"`
	ExpiresIn    int64          `json:"expiresIn"`
	CreateAt     sql.NullString `json:"createAt"`
}

type User struct {
	ID       int64          `json:"id"`
	Email    string         `json:"email" validate:"required,email"`
	Password string         `json:"password" validate:"required,min=8,max=32"`
	Name     string         `json:"name"`
	Bio      sql.NullString `json:"bio"`
	UpdateAt sql.NullString `json:"updateAt"`
	CreateAt sql.NullString `json:"createAt"`
}
