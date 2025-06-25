import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Spinner } from '@/shared/ui/spinner'
import { Suspense } from 'react'
import { Link } from 'react-router'
import ResetPasswordForm from '../components/forgot-password-form'

export default function ResetPasswordPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Suspense fallback={<Spinner />}>
          <Card>
            <CardHeader>
              <CardTitle>비밀번호 재설정</CardTitle>
              <CardDescription>
                새로운 비밀번호를 입력하시면 비밀번호가 재설정됩니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm />
            </CardContent>
            <CardFooter className="flex w-full items-center justify-center">
              <Button variant="link" className="text-lg">
                <Link to="/auth/login">로그인으로 돌아가기</Link>
              </Button>
            </CardFooter>
          </Card>
        </Suspense>
      </div>
    </div>
  )
}
