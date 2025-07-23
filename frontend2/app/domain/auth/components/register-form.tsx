import FormInput from '@/shared/components/form-input'
import { useAuth } from '@/shared/providers/auth-provider'
import { setToken } from '@/shared/services'
import { Button } from '@/shared/ui/button'
import { extractErrorMessage } from '@/shared/utils/errors'
import logger from '@/shared/utils/logger'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { register } from '../services'

const RegisterSchema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해 주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(32, '비밀번호는 32자 이하여야 합니다.'),
    passwordConfirm: z.string(),
    name: z.string().nonempty('이름을 입력해 주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

export type Register = z.infer<typeof RegisterSchema>

export function RegisterForm() {
  const navigate = useNavigate()
  const { checkAuth } = useAuth()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: Register) => {
    try {
      const res = await register(data)
      setToken(res)
      await checkAuth()
      navigate('/projects')
      toast.success('회원가입이 완료되었습니다')
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
        name="passwordConfirm"
        id="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        required
      />
      {errors.passwordConfirm && (
        <p className="error-msg">{errors.passwordConfirm.message}</p>
      )}
      <FormInput control={control} name="name" placeholder="이름" />
      {errors.name && <p className="error-msg">{errors.name.message}</p>}
      <Button className="w-full" type="submit">
        동의하고 가입하기
      </Button>
    </form>
  )
}
