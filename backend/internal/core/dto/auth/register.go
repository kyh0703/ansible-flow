package auth

type Register struct {
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required,min=8,max=32"`
	ConfirmPassword string `json:"confirmPassword" validate:"required,min=8,max=32"`
	Name            string `json:"name" validate:"required,min=2,max=20"`
}
