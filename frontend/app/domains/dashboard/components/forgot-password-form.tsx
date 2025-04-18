import FormInput from '@/shared/components/form-input'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { extractErrorMessage } from '@/shared/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Link, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

const ForgotPasswordSchema = z.object({
  email: z.string({ required_error: '이메일을 입력하여 주세요' }).email(),
})

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  })
  const watchEmail = useWatch({ control, name: 'email' })

  const onSubmit = async (data: ForgotPassword) => {
    setIsLoading(true)

    try {
      setIsSubmitted(true)
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>비밀번호 찾기</CardTitle>
          <CardDescription>
            가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를
            보내드립니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <FormInput
                      control={control}
                      name="email"
                      type="email"
                      className="pl-10"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '처리 중...' : '재설정 링크 전송'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 w-fit rounded-full bg-green-100 p-3 text-green-600">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">이메일을 확인해주세요</h3>
              <p className="text-muted-foreground mt-2">
                {watchEmail}로 비밀번호 재설정 링크를 전송했습니다.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              로그인으로 돌아가기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
