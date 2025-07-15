import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { User } from '@/shared/models/user'
import type { ApiResponse } from '@/shared/services'
import { updateMe, type UpdateUserRequest } from '../api'
import { authKey } from '../keys'

type Response = User
type Variables = UpdateUserRequest
type MutationOptions = UseMutationOptions<
  Response,
  ApiResponse<null>,
  Variables
>

export const useUpdateMe = (options?: MutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<Response, ApiResponse<null>, Variables>({
    ...options,
    mutationFn: (userData) => {
      return updateMe(userData)
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: authKey.me() })
      toast.success('프로필이 성공적으로 업데이트되었습니다.')
      if (options?.onSuccess) {
        options?.onSuccess(data, variables, context)
      }
      return data
    },
    onError: (error, variables, context) => {
      toast.error(error.message)

      if (options?.onError) {
        options?.onError(error, variables, context)
      }
    },
  })
}
