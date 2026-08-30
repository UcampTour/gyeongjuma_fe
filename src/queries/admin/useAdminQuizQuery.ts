import { useQuery } from "@tanstack/react-query"
import { fetchAdminQuizList } from "../../api/admin/AdminQuizApi"

export const useAdminQuizListQuery = () => {
  return useQuery({
    queryKey: ["adminQuizzes"],
    queryFn: fetchAdminQuizList,
  });
};