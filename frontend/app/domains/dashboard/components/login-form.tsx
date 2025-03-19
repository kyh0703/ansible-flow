import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'
import { login } from '~/shared/services/auth/api'
import { setToken } from '~/shared/services/lib/token'
import { Button } from '~/shared/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/shared/ui/dialog'
import FormInput from '~/shared/ui/form-input'

const LoginSchema = z.object({
  email: z.string({ required_error: '이메일을 입력하여 주세요' }).email(),
  password: z.string({ required_error: '패스워드를 입력하여 주세요' }).min(6),
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
      navigate('/auth/register')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-4 py-2 pb-4">
      <DialogHeader>
        <DialogTitle>로그인</DialogTitle>
        <DialogDescription>계정에 로그인하세요</DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
      </form>
      <div className="text-center">
        <Button
          variant="link"
          className="text-lg"
          onClick={() => navigate('/auth/register')}
        >
          <span>계정이 없으신가요? 회원가입</span>
        </Button>
      </div>
    </div>
  )
}
