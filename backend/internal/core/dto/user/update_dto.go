package user

type UpdateDto struct {
	Name     *string `json:"name"`
	Bio      *string `json:"bio"`
	Password *string `json:"password"`
}
