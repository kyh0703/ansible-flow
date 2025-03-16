import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/ui/card'
import { LoginForm } from '../components/login-form'
import { Button } from '~/ui/button'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Card className="bg-main mx-auto w-full max-w-2xl p-3 shadow-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-center text-4xl font-bold">
          <span>로그인</span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          <span>계정에 로그인하세요</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <LoginForm />
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-lg"
          >
            <span>계정이 없으신가요? 회원가입</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
