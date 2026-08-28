import type { AdminUserListResponse } from "../../models/admin/AdminUserModel";
import { apiClient } from "../apiClient";

// 1. 관리자 유저 리스트
export const fetchAdminUserList = async (): Promise<AdminUserListResponse> => {

  const response = await apiClient.get("admin/members");

  return response.data.data;
}