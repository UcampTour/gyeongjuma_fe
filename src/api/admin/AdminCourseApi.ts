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
};

export const createAdminCourseApi = async (payload: any) => {
  const response = await apiClient.post("admin/courses/manage", payload);
  return response.data.data;
};

export const updateAdminCourseApi = async (courseId: number, payload: any) => {
  const response = await apiClient.put(`admin/courses/manage/${courseId}`, payload);
  return response.data.data;
};