import { api } from "./axiosInstance";

export const authService = {

  // 1. 소셜 로그인
  login: (provider: string, token: string) => {
    const body = provider === "GOOGLE" ? { provider, idToken: token } : { provider, accessToken: token };
    return api.post("/api/members/login", body);
  },

  // 2. 닉네임 중복 확인
  checkNickname: (nickname: string) => 
    api.get(`/api/members/check-nickname?nickname=${encodeURIComponent(nickname)}`),

  // 3. 추가 정보 등록
  registerExtraInfo: (data: { nickname: string; difficulty: string }) => 
    api.patch("/api/members/extra-info", data),

  // 4. 토큰 재발급
  reissue: (refreshToken: string) =>
    api.post("api/members/reissue", { refreshToken }),

  // 5. 로그아웃
  logout: () => api.post("/api/members/logout"),

  // 6. 탈퇴
  withdraw: () => api.delete("/api/members"),
}