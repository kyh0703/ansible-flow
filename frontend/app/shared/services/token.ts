let token: Token | null = null

export type Token = {
  accessToken: string
  accessExpiresIn: number
}

export const getToken = (): Token | null => {
  return token
}

export const setToken = (newToken: Token | null) => {
  token = newToken
}
