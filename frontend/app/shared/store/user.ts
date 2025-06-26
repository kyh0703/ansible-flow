import { createJSONStorage } from 'zustand/middleware'
import { createPersistStore } from '../lib/store'
import type { User } from '../models/user'

type UserState = {
  user: User | null
  isInitialized: boolean
  actions: {
    setUser: (user: User | null) => void
    setInitialized: (initialized: boolean) => void
    logout: () => void
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
      setInitialized: (initialized) =>
        set((state) => {
          state.isInitialized = initialized
        }),
      logout: () =>
        set((state) => {
          state.user = null
          state.isInitialized = true
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
export const useIsAuthenticated = () => useUserStore((state) => !!state.user)
export const useIsInitialized = () =>
  useUserStore((state) => state.isInitialized)
