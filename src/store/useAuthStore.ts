import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  // 토큰도 상태로 같이 관리해야 새로고침해도 유지됩니다.
  accessToken: string | null; 
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      
      login: (accessToken) => {
        set({ isLoggedIn: true, accessToken });
      },
      
      logout: () => {
        set({ isLoggedIn: false, accessToken: null });
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);