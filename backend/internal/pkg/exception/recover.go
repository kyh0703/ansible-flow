package exception

import (
	"fmt"
	"os"
	"runtime/debug"

	"github.com/gofiber/fiber/v2"
	fiberRecover "github.com/gofiber/fiber/v2/middleware/recover"
)

func defaultStackTraceHandler(_ *fiber.Ctx, e interface{}) {
	_, _ = os.Stderr.WriteString(fmt.Sprintf("panic: %v\n%s\n", e, debug.Stack())) //nolint:errcheck
}

func configDefault(config ...fiberRecover.Config) fiberRecover.Config {
	if len(config) < 1 {
		return fiberRecover.ConfigDefault
	}

	cfg := config[0]
	if cfg.EnableStackTrace && cfg.StackTraceHandler == nil {
		cfg.StackTraceHandler = defaultStackTraceHandler
	}

	return cfg
}

func Recover(config ...fiberRecover.Config) fiber.Handler {
	cfg := configDefault(config...)

	return func(c *fiber.Ctx) (err error) { //nolint:nonamedreturns
		// Don't execute middleware if Next returns true
		if cfg.Next != nil && cfg.Next(c) {
			return c.Next()
		}

		// Catch panics
		defer func() {
			if r := recover(); r != nil {
				if cfg.EnableStackTrace {
					cfg.StackTraceHandler(c, r)
				}

				var ok bool
				if _, ok = r.(error); ok {
					// sentry.CaptureException(c, err)
				}
			}
		}()

		// Return err if exist, else move to next handler
		return c.Next()
	}
}
