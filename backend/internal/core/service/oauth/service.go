package oauth

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
)

type Provider string

const (
	Google Provider = "google"
	Kakao  Provider = "kakao"
	Github Provider = "github"
)

type Service interface {
	GetAuthURL(provider Provider, state string, redirectURL string) string
	HandleCallback(ctx context.Context, provider Provider, code string, state string) (*model.User, error)
}
