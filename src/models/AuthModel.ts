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
  locale: string;
}

export interface ExtraInfoResponse {
  memberId: number;
  nickname: string;
  profileImage: string | null;
  difficulty: string;
  locale: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  memberId: number;
  userName: string;
  nickname: string;
  role: string;
  accessToken: string;
}

export interface MyInfoData {
  memberId: number;
  nickname: string;
  profileImage: string;
  difficulty: string;
  locale: string;
}