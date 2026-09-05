import { apiClient } from "../apiClient"

//1. 코스 목록 리스트
export const fetchAdminCourseList = async (): Promise<any> => {

  const response = await apiClient.get("admin/courses/manage", {
    params: {
      page: 0,
      size: 5000,
    },
  });

  return response.data.data;
}