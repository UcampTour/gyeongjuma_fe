import type { AdminUserListResponse } from "../../models/admin/AdminUserModel";
import { apiClient } from "../apiClient";

// 1. 관리자 유저 리스트
export const fetchAdminUserList = async (): Promise<AdminUserListResponse> => {

  const response = await apiClient.get("admin/members");

  return response.data.data;
}

// 2. 유저 비활성화 
export const forceWithdraw = async (memberId: number): Promise<void> => {

  await apiClient.delete(`admin/members/${memberId}`);
}

// 3. 유저 포인트 변경
export const adjustPoint = async (memberId: number, amount: number): Promise<void> => {
  
  await apiClient.patch(`admin/members/${memberId}/point`, { amount })
}