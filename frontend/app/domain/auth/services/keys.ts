export const authKey = {
  all: ['auth'] as const,
  me: () => [...authKey.all, 'me'] as const,
}
