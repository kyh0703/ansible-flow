import { register } from '~/services/auth/api'
import { Button } from '~/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import FormInput from '~/ui/form-input'
import { useNavigate } from 'react-router'

const SignupSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
    confirmPassword: z
      .string()
      .min(6, '비밀번호 확인은 6자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

type Signup = z.infer<typeof SignupSchema>

export function RegisterForm() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
  })

  const onSubmit = async (data: Signup) => {
    try {
      const response = await register(data)
      console.log(response)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput control={control} name="name" placeholder="홍길동" />
      {errors.name && <p className="error-msg">{errors.name.message}</p>}
      <FormInput
        control={control}
        name="email"
        type="email"
        placeholder="your@email.com"
        required
      />
      {errors.email && <p className="error-msg">{errors.email.message}</p>}
      <FormInput
        control={control}
        name="password"
        type="password"
        placeholder="••••••••"
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
        placeholder="••••••••"
        required
      />
      {errors.confirmPassword && (
        <p className="error-msg">{errors.confirmPassword.message}</p>
      )}
      <Button className="w-full" type="submit">
        회원가입
      </Button>
    </form>
  )
}
