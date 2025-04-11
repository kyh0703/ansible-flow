package db

func PatchField[T any](old T, newVal *T) T {
	if newVal == nil {
		return old
	}
	return *newVal
}
