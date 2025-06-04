import { create } from 'zustand'

interface State {
  isLoading: boolean
}

interface Action {
  startLoading: () => void
  finallyLoading: () => void
}

export const useLoading = create<State & Action>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  finallyLoading: () => set({ isLoading: false }),
}))
