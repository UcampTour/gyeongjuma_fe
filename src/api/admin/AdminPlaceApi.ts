import { apiClient } from "../apiClient";

export const fetchAdminCourseList = async (): Promise<any> => {
  const response = await apiClient.get("admin/places/contents", {
    params: {
      page: 0,
      size: 1000,
    },
  });

  return response.data.data;
};

export interface UpsertContentPayload {
  language: string;   
  difficulty: "EASY" | "NORMAL" | "HARD";
  description: string;
}

export const updatePlaceContent = async (
  placeId: number, 
  payload: UpsertContentPayload
): Promise<any> => {
  const response = await apiClient.put(`admin/places/${placeId}/contents`, payload);
  return response.data;
};