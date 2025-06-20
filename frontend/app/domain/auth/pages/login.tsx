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
import { LoginForm } from '../components/login-form'

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 text-base sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Suspense fallback={<Spinner />}>
          <Card>
            <CardHeader>
              <CardTitle>로그인</CardTitle>
              <CardDescription>계정에 로그인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex w-full flex-col items-center justify-center">
              <Button variant="link" className="text-lg">
                <Link to="/auth/register">계정이 없으신가요? 회원가입</Link>
              </Button>
            </CardFooter>
          </Card>
        </Suspense>
      </div>
    </div>
  )
}
