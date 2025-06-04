import { User } from '@/services/types/user.dto'
import { create } from 'zustand'

interface State {
  user: User | null
}

interface Action {
  setUser: (user: User) => void
  removeUser: () => void
}

export const useUser = create<State & Action>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}))
