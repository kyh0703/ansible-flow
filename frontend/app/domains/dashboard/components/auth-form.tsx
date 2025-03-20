import { useState } from 'react'
import { Button } from '~/shared/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/shared/ui/dialog'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="space-y-4 py-2 pb-4">
      <DialogHeader>
        <DialogTitle>{isLogin ? '로그인' : '회원가입'}</DialogTitle>
        <DialogDescription>
          {isLogin ? '계정에 로그인하세요' : '새 계정을 만들어보세요'}
        </DialogDescription>
      </DialogHeader>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className="text-center">
        <Button
          variant="link"
          className="text-lg"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          <span>
            {isLogin
              ? '계정이 없으신가요? 회원가입'
              : '이미 계정이 있으신가요? 로그인'}
          </span>
        </Button>
      </div>
    </div>
  )
}
