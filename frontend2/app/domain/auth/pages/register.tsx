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
import { RegisterForm } from '../components/register-form'

export default function RegisterPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 text-base sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Suspense fallback={<Spinner />}>
          <Card>
            <CardHeader>
              <CardTitle>회원가입</CardTitle>
              <CardDescription>새 계정을 만들어보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
            <CardFooter className="flex w-full items-center justify-center">
              <Button variant="link" className="text-lg">
                <Link to="/auth/login">이미 계정이 있으신가요? 로그인</Link>
              </Button>
            </CardFooter>
          </Card>
        </Suspense>
      </div>
    </div>
  )
}
