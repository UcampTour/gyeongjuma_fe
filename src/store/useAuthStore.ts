import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthMember {
  memberId: number;
  nickname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isPendingRegistration: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  member: AuthMember | null;

  login: (
    accessToken: string,
    refreshToken: string,
    member: AuthMember,
    isNewMember: boolean,
  ) => void;
  updateToken: (accessToken: string, refreshToken: string) => void;
  completeRegistration: (memner: AuthMember) => void;
  logout: () => void;
  updateNickname: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isPendingRegistration: false,
      accessToken: null,
      refreshToken: null,
      member: null,

      login: (accessToken, refreshToken, member, isNewMember) => {
        set({
          isLoggedIn: !isNewMember,
          isPendingRegistration: isNewMember,
          accessToken,
          refreshToken,
          member,
        });
      },

      updateToken: (accessToken, refreshToken) => {
        set({
          accessToken,
          refreshToken,
        });
      },

      completeRegistration: (member) => {
        set({ isLoggedIn: true, isPendingRegistration: false, member });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
          member: null,
          isPendingRegistration: false,
        });
      },

      updateNickname: (nickname) =>
        set((state) => ({
          member: state.member ? { ...state.member, nickname } : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
