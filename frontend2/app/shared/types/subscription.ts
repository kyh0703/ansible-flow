export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  billingPeriod: 'monthly' | 'yearly'
  description: string
  features: string[]
  popular?: boolean
  maxProjects?: number
}

export type PlanType = 'basic' | 'pro' | 'enterprise'

export interface UserSubscription {
  planType: PlanType
  planName: string
  isActive: boolean
  maxProjects: number
  currentProjects: number
}

export const SUBSCRIPTION_PLANS: Record<PlanType, SubscriptionPlan> = {
  basic: {
    id: 'basic-monthly',
    name: 'Basic',
    price: 0,
    billingPeriod: 'monthly',
    description: 'Perfect for individuals getting started',
    features: [
      'Up to 5 projects',
      'Basic flow templates',
      'Community support',
      '1GB storage',
    ],
    maxProjects: 5,
  },
  pro: {
    id: 'pro-monthly',
    name: 'Pro',
    price: 5,
    billingPeriod: 'monthly',
    description: 'Best for growing teams',
    features: [
      'Unlimited projects',
      'Advanced flow templates',
      'Priority support',
      '10GB storage',
      'Team collaboration',
      'Custom integrations',
    ],
    popular: true,
    maxProjects: -1, // unlimited
  },
  enterprise: {
    id: 'enterprise-monthly',
    name: 'Enterprise',
    price: 25,
    billingPeriod: 'monthly',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Advanced security',
      'SSO integration',
      'Unlimited storage',
      'Dedicated support',
      'Custom branding',
    ],
    maxProjects: -1, // unlimited
  },
}
