import type { MyInfoResponse } from "../models/ProfileModel";
import { apiClient } from "./apiClient";

export const fetchMyInfo = async (): Promise<MyInfoResponse> => {
  const response = await apiClient.get("mypage");

  return response.data.data;
}

export const fetchTimeline = async (): Promise<any> => {

  const response = await apiClient.get("mypage/visits");

  return response.data.data;
}