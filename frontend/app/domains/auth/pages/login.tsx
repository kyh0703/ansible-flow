import { useNavigate } from 'react-router-dom'
import { Button } from '~/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/ui/card'
import { LoginForm } from '../components/login-form'

export default function Login() {
  const navigate = useNavigate()

  return (
    <Card className="bg-background mx-auto w-full max-w-2xl p-6 shadow-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-center text-4xl font-bold">로그인</CardTitle>
        <CardDescription className="text-center text-xl">
          계정에 로그인하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <LoginForm />
        <div className="text-center">
          <Button
            variant="link"
            className="text-lg"
            onClick={() => navigate('/auth/register')}
          >
            <span>계정이 없으신가요? 회원가입</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
