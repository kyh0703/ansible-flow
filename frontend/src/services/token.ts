let accessToken: string | null = null

export const getAccessToken = (): string | null => {
  return accessToken
}

export const setAccessToken = (newToken: string | null) => {
  accessToken = newToken
}
