import { createStore } from '@/shared/lib/store'
import type { UserSubscription } from '@/shared/types/subscription'

interface SubscriptionState {
  currentSubscription: UserSubscription
  setSubscription: (subscription: UserSubscription) => void
  canCreateProject: () => boolean
  upgradeRequired: () => boolean
  incrementProjectCount: () => void
  decrementProjectCount: () => void
}

// Mock data - 실제로는 API에서 가져와야 함
const mockSubscription: UserSubscription = {
  planType: 'basic',
  planName: 'Basic',
  isActive: true,
  maxProjects: 5,
  currentProjects: 4, // 현재 4개 프로젝트 사용 중 (1개만 더 생성 가능)
}

export const useSubscriptionStore = createStore<SubscriptionState>(
  (set, get) => ({
    currentSubscription: mockSubscription,

    setSubscription: (subscription) => {
      set({ currentSubscription: subscription })
    },

    canCreateProject: () => {
      const { currentSubscription } = get()
      if (currentSubscription.maxProjects === -1) return true // unlimited
      return (
        currentSubscription.currentProjects < currentSubscription.maxProjects
      )
    },

    upgradeRequired: () => {
      const { currentSubscription } = get()
      if (currentSubscription.maxProjects === -1) return false // unlimited
      return (
        currentSubscription.currentProjects >= currentSubscription.maxProjects
      )
    },

    incrementProjectCount: () => {
      set((state) => ({
        currentSubscription: {
          ...state.currentSubscription,
          currentProjects: state.currentSubscription.currentProjects + 1,
        },
      }))
    },

    decrementProjectCount: () => {
      set((state) => ({
        currentSubscription: {
          ...state.currentSubscription,
          currentProjects: Math.max(
            0,
            state.currentSubscription.currentProjects - 1,
          ),
        },
      }))
    },
  }),
  { name: 'SubscriptionStore' },
)
