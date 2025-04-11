import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { register } from '~/shared/services/auth/api'
import { setToken } from '~/shared/services/lib/token'
import { Button } from '~/shared/ui/button'
import FormInput from '~/shared/ui/form-input'
import { extractErrorMessage } from '~/shared/utils/errors'
import logger from '~/shared/utils/logger'

const SignupSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해 주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(32, '비밀번호는 32자 이하여야 합니다.'),
    confirmPassword: z.string(),
    name: z.string().nonempty('이름을 입력해 주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

type Register = z.infer<typeof SignupSchema>

export function RegisterForm() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(SignupSchema),
  })

  const onSubmit = async (data: Register) => {
    try {
      const response = await register(data)
      setToken(response)
      navigate('/project')
    } catch (error) {
      toast.error(extractErrorMessage(error))
      logger.error(error)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="email"
        type="email"
        placeholder="아이디(이메일)"
        required
      />
      {errors.email && <p className="error-msg">{errors.email.message}</p>}
      <FormInput
        control={control}
        name="password"
        type="password"
        placeholder="비밀번호"
        required
      />
      {errors.password && (
        <p className="error-msg">{errors.password.message}</p>
      )}
      <FormInput
        control={control}
        name={'confirmPassword'}
        id="confirmPassword"
        type="password"
        placeholder="비밀번호 확인"
        required
      />
      {errors.confirmPassword && (
        <p className="error-msg">{errors.confirmPassword.message}</p>
      )}
      <FormInput control={control} name="name" placeholder="이름" />
      {errors.name && <p className="error-msg">{errors.name.message}</p>}
      <Button className="w-full" type="submit">
        동의하고 가입하기
      </Button>
    </form>
  )
}
