import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthMember {
  memberId: number;
  nickname: string;
  difficulty?: string; // 💡 난이도 추가
  locale?: string;     // 💡 언어(로케일) 추가
}

interface AuthState {
  isLoggedIn: boolean;
  isPendingRegistration: boolean;
  member: AuthMember | null;
  accessToken: string | null;

  login: (
    member: AuthMember,
    isNewMember: boolean,
    accessToken: string,
  ) => void;
  setAccessToken: (accessToken: string) => void;
  completeRegistration: (member: AuthMember) => void;
  logout: () => void;
  updateNickname: (nickname: string) => void;
  setMemberInfo: (member: Partial<AuthMember>) => void; // 💡 회원 정보 일부/전체 갱신 함수 추가
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
          accessToken,
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
          accessToken: null,
        });
      },

      updateNickname: (nickname) =>
        set((state) => ({
          member: state.member ? { ...state.member, nickname } : null,
        })),

      // 💡 프로필 수정이나 추가 정보 등록 시 반영용
      setMemberInfo: (updatedInfo) =>
        set((state) => ({
          member: state.member ? { ...state.member, ...updatedInfo } : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);