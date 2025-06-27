import { createJSONStorage } from 'zustand/middleware'
import { createPersistStore } from '../lib/store'
import type { User } from '../models/user'

type UserState = {
  user: User | null
  actions: {
    setUser: (user: User | null) => void
  }
}

const useUserStore = createPersistStore<UserState>(
  (set) => ({
    user: null,
    isInitialized: false,
    actions: {
      setUser: (user) =>
        set((state) => {
          state.user = user
        }),
    },
  }),
  {
    name: 'UserStore',
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => ({
      user: state.user,
    }),
  },
)

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
