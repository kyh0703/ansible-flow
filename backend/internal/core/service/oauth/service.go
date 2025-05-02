package oauth

import (
	"context"

	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/dto/auth"
)

type Provider string

const (
	Google Provider = "google"
	Kakao  Provider = "kakao"
	Github Provider = "github"
)

type Service interface {
	GenerateAuthURL(provider Provider, state string, redirectURL string) (string, error)
	GetOAuthState(state string) (*model.OauthState, error)
	HandleCallback(ctx context.Context, provider Provider, code string, state string) (*auth.Token, error)
}
