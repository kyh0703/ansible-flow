package user

type UpdateUserRequest struct {
	Name     *string `json:"name"`
	Bio      *string `json:"bio"`
	Password *string `json:"password"`
}
