/* -------- Interface -------- */

/**
 * 관리자 유저 데이터 응답 인터페이스
 */
export interface AdminUserListResponse {
  totalCnt: number;
  page: number;
  size: number;
  totalPages: number;
  members: AdminUserData[];
}

/**
 * 유저 데이터 인터페이스
 */
export interface AdminUserData {
  memberId: number;
  nickname: string;
  provider: string;
  role: string;
  difficulty: string;
  locale: string;
  point: number;
  isActive: boolean;
  createdAt: string;
  deletedAt: string | null;
}