import { useQuery } from "@tanstack/react-query"
import { fetchAdminCourseList } from "../../api/admin/AdminPlaceApi"

export const useAdminCourseListQuery = () => {
  return useQuery({
    queryKey: ["adminCourses"],
    queryFn: fetchAdminCourseList,
  });
};