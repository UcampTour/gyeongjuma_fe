import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthMember {
  memberId: number;
  nickname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null; 
  refreshToken: string | null;
  member: AuthMember | null;

  login: (accessToken: string, refreshToken: string, member: AuthMember) => void;
  logout: () => void;
  updateNickname: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      member: null,
      
      login: (accessToken, refreshToken, member) => {
        set({ isLoggedIn: true, accessToken, refreshToken, member });
      },
      
      logout: () => {
        set({ isLoggedIn: false, accessToken: null, refreshToken: null, member: null });
      },

      updateNickname: (nickname) =>
        set((state) => ({
          member: state.member ? {...state.member, nickname} : null
        })),
    }),
    {
      name: 'auth-storage', 
    }
  )
);