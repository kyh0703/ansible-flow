import FormInput from '@/shared/components/form-input'
import { GoogleIcon, KakaoIcon } from '@/shared/components/icon'
import { setToken } from '@/shared/services'
import { Button } from '@/shared/ui/button'
import { extractErrorMessage } from '@/shared/utils/errors'
import logger from '@/shared/utils/logger'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { login } from '../services'
import { Tooltip, TooltipTrigger } from '@/shared/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import OAuthButton from './oauth-button'

const LoginSchema = z.object({
  email: z.string({ required_error: '이메일을 입력하여 주세요' }).email(),
  password: z
    .string({ required_error: '패스워드를 입력하여 주세요' })
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(32, '비밀번호는 32자 이하여야 합니다.'),
})

type Login = z.infer<typeof LoginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: Login) => {
    try {
      const response = await login(data)
      setToken(response)
      navigate('/project')
    } catch (error) {
      toast.error(extractErrorMessage(error))
      logger.error(error)
    }
  }

  return (
    <form
      className="flex flex-col items-center justify-center space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        control={control}
        name="email"
        className="rounded p-2"
        type="email"
        placeholder="아이디(이메일)"
      />
      {errors.email && <p className="error-msg">{errors.email.message}</p>}
      <FormInput
        control={control}
        className="rounded p-2"
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      {errors.password && (
        <p className="error-msg">{errors.password.message}</p>
      )}
      <Button className="w-full" type="submit">
        로그인
      </Button>
      <section className="flex gap-2">
        <OAuthButton />
      </section>
      <Button
        className="text-sm text-gray-500 hover:text-gray-700"
        variant="link"
      >
        <Link to="/forgot-password">비밀번호를 잊으셨나요?</Link>
      </Button>
    </form>
  )
}
