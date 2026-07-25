export interface SignupRequest {
  provider: string;
  idToken: string | null;
  accessToken: string | null;
}

export interface SingupResponse {
  memberId: number;
  email: string;
  nickname: string | null;
  isNewMember: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface CheckNicknameRequest {
  nickname: string;
}

export interface CheckNicknameResponse {
  nickname: string;
  available: boolean;
}

export interface ExtraInfoRequest {
  nickname: string;
  difficulty: string;
}

export interface ExtraInfoResponse {
  memberId: number;
  nickname: string;
  profileImage: string | null;
  difficulty: string; //추후 ENUM으로 변경
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
