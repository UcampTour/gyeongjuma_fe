import type { AdminLoginRequest, AdminLoginResponse, CheckNicknameRequest, CheckNicknameResponse, ExtraInfoRequest, ExtraInfoResponse, RefreshTokenResponse, SignupRequest, SingupResponse } from "../models/AuthModel";
import { apiClient, type ApiResponse } from "./apiClient";
import { authClient } from "./authClient";

// 1. 소셜 로그인
export const login = async (request: SignupRequest): Promise<SingupResponse> => {
  const response = await apiClient.post<ApiResponse<SingupResponse>>("/members/login", request);
  return response.data.data;
}

// 2. 닉네임 중복 확인 
export const checkNickname = async (request: CheckNicknameRequest): Promise<CheckNicknameResponse> => {
  const response = await apiClient.get("/members/check-nickname",{ params: { nickname: request.nickname} });
  return response.data.data;
}

// 3. 추가 정보 등록
export const registerExtraInfo = async (request: ExtraInfoRequest): Promise<ExtraInfoResponse> => {
  const response = await apiClient.patch("/members/extra-info", request);
  return response.data.data;
}

// 4. 토큰 재발급 (💡 재발급 후 새 액세스 토큰 문자열을 반환하도록 수정)
export const reissue = async (): Promise<string> => {
  const response = await authClient.post<ApiResponse<RefreshTokenResponse>>("/members/reissue");
  return response.data.data.accessToken; 
}

// 5. 로그아웃
export const logout = async (): Promise<void> => {
  await apiClient.post("/members/logout");
};

// 6. 회원 탈퇴
export const withdraw = async (): Promise<void> => {
  await apiClient.delete("/members");
}

// 7. 관리자 로그인
export const adminLogin = async (request: AdminLoginRequest): Promise<AdminLoginResponse> => {
  const response = await apiClient.post("/admin/login", request);

  return response.data.data;
}