import { useNavigate } from 'react-router-dom'
import { Button } from '~/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/ui/card'
import { RegisterForm } from '../components/register-form'

export default function Register() {
  const navigate = useNavigate()

  return (
    <Card className="bg-background mx-auto w-full max-w-2xl p-6 shadow-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-center text-4xl font-bold">
          회원가입
        </CardTitle>
        <CardDescription className="text-center text-xl">
          계정을 생성하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <RegisterForm />
        <div className="text-center">
          <Button
            variant="link"
            className="text-lg"
            onClick={() => navigate('/auth/login')}
          >
            <span>계정이 있으신가요? 로그인</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
