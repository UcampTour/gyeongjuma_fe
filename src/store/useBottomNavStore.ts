import { create } from "zustand";

interface BottomNavigationState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export const useBottomNavStore = create<BottomNavigationState>((set) => ({
  isVisible: true,

  show: () => set({ isVisible: true }),

  hide: () => set({ isVisible: false }),

  toggle: () =>
    set((state) => ({
      isVisible: !state.isVisible,
    })),
}));
