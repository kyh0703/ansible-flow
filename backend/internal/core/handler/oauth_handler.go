package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/kyh0703/flow/internal/core/domain/repository"
	"github.com/kyh0703/flow/internal/core/service/oauth"
)

//counterfeiter:generate . OAuthHandler
type OAuthHandler interface {
	Handler
	GoogleLogin(c *fiber.Ctx) error
	GoogleCallback(c *fiber.Ctx) error
	GithubLogin(c *fiber.Ctx) error
	GithubCallback(c *fiber.Ctx) error
	KakaoLogin(c *fiber.Ctx) error
	KakaoCallback(c *fiber.Ctx) error
}

type oauthHandler struct {
	oauthService    oauth.Service
	oauthRepository repository.OAuthRepository
}

func NewOAuthHandler(
	oauthService oauth.Service,
	oauthRepository repository.OAuthRepository,
) OAuthHandler {
	return &oauthHandler{
		oauthService:    oauthService,
		oauthRepository: oauthRepository,
	}
}

func (o *oauthHandler) Table() []Mapper {
	return []Mapper{
		Mapping(
			fiber.MethodGet,
			"/auth/google/login",
			o.GoogleLogin,
		),
		Mapping(
			fiber.MethodGet,
			"/auth/google/callback",
			o.GoogleCallback,
		),
		Mapping(
			fiber.MethodGet,
			"/auth/github/login",
			o.GithubLogin,
		),
		Mapping(
			fiber.MethodGet,
			"/auth/github/callback",
			o.GithubCallback,
		),
		Mapping(
			fiber.MethodGet,
			"/auth/kakao/login",
			o.KakaoLogin,
		),
		Mapping(
			fiber.MethodGet,
			"/auth/kakao/callback",
			o.KakaoCallback,
		),
	}
}

func (o *oauthHandler) GoogleLogin(c *fiber.Ctx) error {
	state := uuid.New().String()
	redirectURL := c.Query("redirect_url", "/")

	authURL, err := o.oauthService.GenerateAuthURL(oauth.Google, state, redirectURL)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.Redirect(authURL)
}

func (o *oauthHandler) GoogleCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	state := c.Query("state")

	if code == "" || state == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing code or state")
	}

	_, err := o.oauthService.HandleCallback(c.Context(), oauth.Google, code, state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	savedState, err := o.oauthRepository.GetState(c.Context(), state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.Redirect(savedState.RedirectUrl)
}

func (o *oauthHandler) GithubLogin(c *fiber.Ctx) error {
	state := uuid.New().String()
	redirectURL := c.Query("redirect_url", "/")

	authURL, err := o.oauthService.GenerateAuthURL(oauth.Github, state, redirectURL)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.Redirect(authURL)
}

func (o *oauthHandler) GithubCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	state := c.Query("state")

	if code == "" || state == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing code or state")
	}

	_, err := o.oauthService.HandleCallback(c.Context(), oauth.Github, code, state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	savedState, err := o.oauthRepository.GetState(c.Context(), state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.Redirect(savedState.RedirectUrl)
}

func (o *oauthHandler) KakaoLogin(c *fiber.Ctx) error {
	state := uuid.New().String()
	redirectURL := c.Query("redirect_url", "/")

	authURL, err := o.oauthService.GenerateAuthURL(oauth.Kakao, state, redirectURL)
	if err != nil {
		return fiber.NewError(500, err.Error())
	}

	return c.Redirect(authURL)
}

func (o *oauthHandler) KakaoCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	state := c.Query("state")

	if code == "" || state == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing code or state")
	}

	_, err := o.oauthService.HandleCallback(c.Context(), oauth.Kakao, code, state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	savedState, err := o.oauthRepository.GetState(c.Context(), state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.Redirect(savedState.RedirectUrl)
}
