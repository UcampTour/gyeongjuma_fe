import { useQuery } from "@tanstack/react-query"
import { fetchAdminCourseList } from "../../api/admin/AdminCourseApi";

export const useAdminCourseListQuery = () => {
  return useQuery({
    queryKey: ["adminCourses"],
    queryFn: fetchAdminCourseList,
  });
};