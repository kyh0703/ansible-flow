import type { ReturnFetch } from 'return-fetch'
import returnFetch from 'return-fetch'
import type { ApiResponse } from '.'
import { setAccessToken } from '../token'

let retryCount = 0
let refreshing = false
let refreshPromise: Promise<void> | null = null

export const returnFetchAuthRefresh: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response, requestArgs, fetch) => {
        if (response.status !== 401) {
          return response
        }

        if (refreshing) {
          await refreshPromise
          return fetch(...requestArgs)
        }

        refreshing = true
        refreshPromise = fetch(
          `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .then(async (responseToRefresh) => {
            if (responseToRefresh.status !== 200) {
              throw Error('failed to refresh cookie')
            }

            const newToken =
              (await responseToRefresh.json()) as ApiResponse<string>

            setAccessToken(newToken.data)

            retryCount += 1
            console.log(
              `🔄 succeeded to refresh and retry request ${retryCount}`,
              newToken,
            )

            refreshing = false
            refreshPromise = null
          })
          .catch((error) => {
            refreshing = false
            refreshPromise = null
            throw error
          })

        await refreshPromise
        console.log('refreshing after fetch', requestArgs)
        return fetch(...requestArgs)
      },
    },
  })
