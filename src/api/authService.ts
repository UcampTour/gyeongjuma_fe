import type { CheckNicknameRequest, CheckNicknameResponse, ExtraInfoRequest, ExtraInfoResponse, RefreshTokenResponse, SignupRequest, SingupResponse } from "../models/AuthModel";
import { useAuthStore } from "../store/useAuthStore";
import { apiClient, type ApiResponse } from "./apiClient";
import { authClient } from "./authClient";

// 여기서 AuthStore 안쓰는 방향으로...
// 1. 소셜 로그인
export const login = async (request: SignupRequest): Promise<SingupResponse> => {
  const response = await apiClient.post<ApiResponse<SingupResponse>>("/api/members/login", request);

  return response.data.data;
}

// 2. 닉네임 중복 확인 
export const checkNickname = async (request: CheckNicknameRequest): Promise<CheckNicknameResponse> => {
  const response = await apiClient.get("/api/members/check-nickname",{ params: { nickname: request.nickname} });

  return response.data.data;
}

// 3. 추가 정보 등록
export const registerExtraInfo = async (request: ExtraInfoRequest): Promise<ExtraInfoResponse> => {
  const response = await apiClient.patch("/api/members/extra-info", request);

  return response.data.data;
}

// 4. 토큰 재발급
export const reissue = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = useAuthStore.getState().refreshToken;

  const response = await authClient.post("/api/members/reissue", { refreshToken });

  return response.data.data;
}

// 5. 로그아웃
export const logout = async (): Promise<void> => {

  await apiClient.post("/api/members/logout");
};

//6. 회원 탈퇴
export const withdraw = async (): Promise<void> => {
  
  await apiClient.delete("/api/members");
}