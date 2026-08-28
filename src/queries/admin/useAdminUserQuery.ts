import { useQuery } from "@tanstack/react-query";
import { fetchAdminUserList } from "../../api/admin/AdminUserApi";

// 1. 관리자 유저 리스트 쿼리
export const useAdminUserListQuery = () => {
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: fetchAdminUserList,
  });
};