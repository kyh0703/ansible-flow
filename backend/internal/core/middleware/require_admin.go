package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kyh0703/flow/internal/core/domain/model"
)

func RequireAdmin() fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals("user").(model.User)

		if user.IsAdmin == 0 {
			return fiber.NewError(fiber.StatusForbidden, "admin permission required")
		}

		return c.Next()
	}
}
