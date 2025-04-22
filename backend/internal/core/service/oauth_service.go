package service

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	"github.com/kyh0703/flow/configs"
	"github.com/kyh0703/flow/internal/core/domain/model"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type GoogleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
}

type OAuthService interface {
	GetGoogleAuthURL(state string, redirectURL string) string
	HandleGoogleCallback(ctx context.Context, code string, state string) (*model.User, error)
}

type oauthService struct {
	config          *configs.Config
	userRepository  repository.UserRepository
	stateRepository repository.OAuthStateRepository
	googleConf      *oauth2.Config
}

func NewOAuthService(
	config *configs.Config,
	userRepository repository.UserRepository,
	stateRepository repository.OAuthStateRepository,
) OAuthService {
	googleConf := &oauth2.Config{
		ClientID:     config.Auth.Google.ClientID,
		ClientSecret: config.Auth.Google.ClientSecret,
		RedirectURL:  config.Auth.Google.RedirectURL,
		Scopes:       config.Auth.Google.Scopes,
		Endpoint:     google.Endpoint,
	}

	return &oauthService{
		config:          config,
		userRepository:  userRepository,
		stateRepository: stateRepository,
		googleConf:      googleConf,
	}
}

func (s *oauthService) GetGoogleAuthURL(state string, redirectURL string) string {
	// Save state with expiration
	s.stateRepository.CreateState(context.Background(), model.CreateOAuthStateParams{
		State:       state,
		RedirectUrl: redirectURL,
		ExpiresAt:   time.Now().Add(15 * time.Minute).Format(time.RFC3339),
	})

	return s.googleConf.AuthCodeURL(state)
}

func (s *oauthService) HandleGoogleCallback(ctx context.Context, code string, state string) (*model.User, error) {
	// Verify state
	savedState, err := s.stateRepository.GetState(ctx, state)
	if err != nil {
		return nil, fmt.Errorf("invalid state: %w", err)
	}

	// Check expiration
	expiresAt, err := time.Parse(time.RFC3339, savedState.ExpiresAt)
	if err != nil {
		return nil, fmt.Errorf("invalid expiration time: %w", err)
	}
	if time.Now().After(expiresAt) {
		return nil, fmt.Errorf("state expired")
	}

	// Exchange code for token
	token, err := s.googleConf.Exchange(ctx, code)
	if err != nil {
		return nil, fmt.Errorf("code exchange failed: %w", err)
	}

	// Get user info
	client := s.googleConf.Client(ctx, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %w", err)
	}
	defer resp.Body.Close()

	var userInfo GoogleUserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return nil, fmt.Errorf("failed decoding user info: %w", err)
	}

	// Find or create user
	user, err := s.userRepository.FindByEmail(ctx, userInfo.Email)
	if err != nil {
		// Create new user
		user, err = s.userRepository.CreateOne(ctx, model.CreateUserParams{
			Email:      userInfo.Email,
			Name:       userInfo.Name,
			Provider:   sql.NullString{String: "google", Valid: true},
			ProviderID: sql.NullString{String: userInfo.ID, Valid: true},
			IsAdmin:    0,
		})
		if err != nil {
			return nil, fmt.Errorf("failed creating user: %w", err)
		}
	}

	return &user, nil
}
