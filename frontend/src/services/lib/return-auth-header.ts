import returnFetch, { type ReturnFetch } from 'return-fetch'
import { getAccessToken } from '../token'

export const returnFetchAuthHeader: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      request: async (args) => {
        const accessToken = getAccessToken()
        if (!accessToken) {
          return args
        }

        const headers = new Headers(args[1]?.headers || {})
        headers.set('Authorization', `Bearer ${accessToken}`)

        return [
          args[0],
          {
            ...args[1],
            headers,
          },
        ]
      },
    },
  })
