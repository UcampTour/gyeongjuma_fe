import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthMember {
  memberId: number;
  nickname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isPendingRegistration: boolean;
  member: AuthMember | null;
  accessToken: string | null; // 💡 액세스 토큰 저장 필드 추가

  login: (
    member: AuthMember,
    isNewMember: boolean,
    accessToken: string, // 💡 로그인 시 토큰도 함께 받아서 저장
  ) => void;
  setAccessToken: (accessToken: string) => void; // 💡 토큰만 갱신할 때 사용
  completeRegistration: (member: AuthMember) => void;
  logout: () => void;
  updateNickname: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isPendingRegistration: false,
      member: null,
      accessToken: null,

      login: (member, isNewMember, accessToken) => {
        set({
          isLoggedIn: !isNewMember,
          isPendingRegistration: isNewMember,
          member,
          accessToken, // 💡 로그인 성공 시 토큰 저장
        });
      },

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      completeRegistration: (member) => {
        set({ isLoggedIn: true, isPendingRegistration: false, member });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          member: null,
          isPendingRegistration: false,
          accessToken: null, // 💡 로그아웃 시 토큰도 초기화
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