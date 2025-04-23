package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/kyh0703/flow/internal/core/service/oauth"
	"github.com/kyh0703/flow/internal/pkg/response"
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
	oauthService oauth.Service
}

func NewOAuthHandler(
	oauthService oauth.Service,
) OAuthHandler {
	return &oauthHandler{
		oauthService: oauthService,
	}
}

func (h *oauthHandler) Table() []Mapper {
	return []Mapper{
		Mapping(fiber.MethodGet, "/auth/google/login", h.GoogleLogin),
		Mapping(fiber.MethodGet, "/auth/google/callback", h.GoogleCallback),
		Mapping(fiber.MethodGet, "/auth/github/login", h.GithubLogin),
		Mapping(fiber.MethodGet, "/auth/github/callback", h.GithubCallback),
		Mapping(fiber.MethodGet, "/auth/kakao/login", h.KakaoLogin),
		Mapping(fiber.MethodGet, "/auth/kakao/callback", h.KakaoCallback),
	}
}

func (h *oauthHandler) GoogleLogin(c *fiber.Ctx) error {
	state := uuid.New().String()
	redirectURL := c.Query("redirect_url", "/")

	authURL := h.oauthService.GetAuthURL(oauth.Google, state, redirectURL)
	return c.Redirect(authURL)
}

func (h *oauthHandler) GoogleCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	state := c.Query("state")

	if code == "" || state == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing code or state")
	}

	user, err := h.oauthService.HandleCallback(c.Context(), oauth.Google, code, state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return response.Success(c, fiber.StatusOK, user)
}

func (h *oauthHandler) GithubLogin(c *fiber.Ctx) error {
	state := uuid.New().String()
	redirectURL := c.Query("redirect_url", "/")

	authURL := h.oauthService.GetAuthURL(oauth.Github, state, redirectURL)
	return c.Redirect(authURL)
}

func (h *oauthHandler) GithubCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	state := c.Query("state")

	if code == "" || state == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing code or state")
	}

	user, err := h.oauthService.HandleCallback(c.Context(), oauth.Github, code, state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return response.Success(c, fiber.StatusOK, user)
}

func (h *oauthHandler) KakaoLogin(c *fiber.Ctx) error {
	state := uuid.New().String()
	redirectURL := c.Query("redirect_url", "/")

	authURL := h.oauthService.GetAuthURL(oauth.Kakao, state, redirectURL)
	return c.Redirect(authURL)
}

func (h *oauthHandler) KakaoCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	state := c.Query("state")

	if code == "" || state == "" {
		return fiber.NewError(fiber.StatusBadRequest, "missing code or state")
	}

	user, err := h.oauthService.HandleCallback(c.Context(), oauth.Kakao, code, state)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return response.Success(c, fiber.StatusOK, user)
}
