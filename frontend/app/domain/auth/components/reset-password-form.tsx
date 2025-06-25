import FormInput from '@/shared/components/form-input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const ResetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: '새 비밀번호를 입력하여 주세요' })
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
    confirmPassword: z.string({
      required_error: '비밀번호 확인을 입력하여 주세요',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

type ResetPassword = z.infer<typeof ResetPasswordSchema>

interface ResetPasswordFormProps {
  onSubmit: (data: { password: string }) => Promise<void>
}

export default function ResetPasswordForm({
  onSubmit,
}: ResetPasswordFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const handleFormSubmit = async (data: ResetPassword) => {
    try {
      await onSubmit({ password: data.password })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">새 비밀번호</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <FormInput
              control={control}
              name="password"
              type="password"
              className="pl-10"
              placeholder="새 비밀번호를 입력하세요"
              required
            />
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <FormInput
              control={control}
              name="confirmPassword"
              type="password"
              className="pl-10"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
            {errors.confirmPassword && (
              <p className="error-msg">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '변경 중...' : '비밀번호 변경'}
        </Button>
      </div>
    </form>
  )
}
