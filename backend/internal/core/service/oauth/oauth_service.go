package oauth

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
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/kakao"
)

type oauthService struct {
	config          *configs.Config
	userRepository  repository.UserRepository
	oauthRepository repository.OAuthRepository
	providers       map[Provider]*providerConfig
}

type providerConfig struct {
	oauth2Config *oauth2.Config
	userInfoURL  string
	mapUserInfo  func([]byte) (*userInfo, error)
}

type userInfo struct {
	email      string
	name       string
	providerID string
}

func NewOAuthService(
	config *configs.Config,
	userRepository repository.UserRepository,
	oauthRepository repository.OAuthRepository,
) Service {
	providers := map[Provider]*providerConfig{
		Google: {
			oauth2Config: &oauth2.Config{
				ClientID:     config.Auth.Google.ClientID,
				ClientSecret: config.Auth.Google.ClientSecret,
				RedirectURL:  config.Auth.Google.RedirectURL,
				Scopes:       config.Auth.Google.Scopes,
				Endpoint:     google.Endpoint,
			},
			userInfoURL: "https://www.googleapis.com/oauth2/v2/userinfo",
			mapUserInfo: mapGoogleUserInfo,
		},
		Kakao: {
			oauth2Config: &oauth2.Config{
				ClientID:     config.Auth.Kakao.ClientID,
				ClientSecret: config.Auth.Kakao.ClientSecret,
				RedirectURL:  config.Auth.Kakao.RedirectURL,
				Scopes:       config.Auth.Kakao.Scopes,
				Endpoint:     kakao.Endpoint,
			},
			userInfoURL: "https://kapi.kakao.com/v2/user/me",
			mapUserInfo: mapKakaoUserInfo,
		},
		Github: {
			oauth2Config: &oauth2.Config{
				ClientID:     config.Auth.Github.ClientID,
				ClientSecret: config.Auth.Github.ClientSecret,
				RedirectURL:  config.Auth.Github.RedirectURL,
				Scopes:       config.Auth.Github.Scopes,
				Endpoint:     github.Endpoint,
			},
			userInfoURL: "https://api.github.com/user",
			mapUserInfo: mapGithubUserInfo,
		},
	}

	return &oauthService{
		config:          config,
		userRepository:  userRepository,
		oauthRepository: oauthRepository,
		providers:       providers,
	}
}

func mapGoogleUserInfo(data []byte) (*userInfo, error) {
	var info GoogleUserInfo
	if err := json.Unmarshal(data, &info); err != nil {
		return nil, err
	}
	return &userInfo{
		email:      info.Email,
		name:       info.Name,
		providerID: info.ID,
	}, nil
}

func mapKakaoUserInfo(data []byte) (*userInfo, error) {
	var info KakaoUserInfo
	if err := json.Unmarshal(data, &info); err != nil {
		return nil, err
	}
	return &userInfo{
		email:      info.KakaoAccount.Email,
		name:       info.Properties.Nickname,
		providerID: fmt.Sprintf("%d", info.ID),
	}, nil
}

func mapGithubUserInfo(data []byte) (*userInfo, error) {
	var info GithubUserInfo
	if err := json.Unmarshal(data, &info); err != nil {
		return nil, err
	}
	return &userInfo{
		email:      info.Email,
		name:       info.Login,
		providerID: fmt.Sprintf("%d", info.ID),
	}, nil
}

func (s *oauthService) GetAuthURL(provider Provider, state string, redirectURL string) string {
	s.oauthRepository.CreateState(context.Background(), model.CreateOAuthStateParams{
		State:       state,
		RedirectUrl: redirectURL,
		ExpiresAt:   time.Now().Add(15 * time.Minute).Format(time.RFC3339),
	})

	return s.providers[provider].oauth2Config.AuthCodeURL(state)
}

func (s *oauthService) HandleCallback(ctx context.Context, provider Provider, code string, state string) (*model.User, error) {
	savedState, err := s.oauthRepository.GetState(ctx, state)
	if err != nil {
		return nil, fmt.Errorf("invalid state: %w", err)
	}

	expiresAt, err := time.Parse(time.RFC3339, savedState.ExpiresAt)
	if err != nil {
		return nil, fmt.Errorf("invalid expiration time: %w", err)
	}
	if time.Now().After(expiresAt) {
		return nil, fmt.Errorf("state expired")
	}

	providerCfg := s.providers[provider]
	token, err := providerCfg.oauth2Config.Exchange(ctx, code)
	if err != nil {
		return nil, fmt.Errorf("code exchange failed: %w", err)
	}

	client := providerCfg.oauth2Config.Client(ctx, token)
	resp, err := client.Get(providerCfg.userInfoURL)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %w", err)
	}
	defer resp.Body.Close()

	var body []byte
	if _, err := resp.Body.Read(body); err != nil {
		return nil, fmt.Errorf("failed reading response body: %w", err)
	}

	userInfo, err := providerCfg.mapUserInfo(body)
	if err != nil {
		return nil, fmt.Errorf("failed mapping user info: %w", err)
	}

	user, err := s.userRepository.FindByEmail(ctx, userInfo.email)
	if err != nil {
		user, err = s.userRepository.CreateOne(ctx, model.CreateUserParams{
			Email:      userInfo.email,
			Name:       userInfo.name,
			Provider:   sql.NullString{String: string(provider), Valid: true},
			ProviderID: sql.NullString{String: userInfo.providerID, Valid: true},
			IsAdmin:    0,
		})
		if err != nil {
			return nil, fmt.Errorf("failed creating user: %w", err)
		}
	}

	return &user, nil
}
