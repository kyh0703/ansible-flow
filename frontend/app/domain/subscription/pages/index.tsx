import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { CheckIcon, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { SUBSCRIPTION_PLANS } from '@/shared/types/subscription'

const subscriptionPlans = Object.values(SUBSCRIPTION_PLANS)

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true)
    setSelectedPlan(planId)

    try {
      // TODO: 실제 결제 API 호출
      console.log('Subscribing to plan:', planId)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // 임시 로딩

      // 결제 성공 후 처리
      alert('구독이 완료되었습니다!')
    } catch (error) {
      console.error('Subscription failed:', error)
      alert('구독 처리 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
            <p className="text-muted-foreground mb-8 text-xl">
              Select the perfect plan for your workflow automation needs
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? 'border-primary ring-primary/20 scale-105 ring-2'
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="pb-8 text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">
                    /{plan.billingPeriod}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckIcon className="text-primary mt-0.5 size-5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="h-12 w-full text-base"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                >
                  {isLoading && selectedPlan === plan.id
                    ? 'Processing...'
                    : `Subscribe to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 space-y-2 text-center">
          <p className="text-muted-foreground text-sm">
            All plans include 14-day free trial. Cancel anytime.
          </p>
          <p className="text-muted-foreground text-sm">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  )
}
