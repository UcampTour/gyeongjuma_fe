/**
 * 오디오 api
 */

import { apiClient } from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 오디오 리스트 조회
 * @param placeId
 * @returns
 */
export const getAudioList = async (placeId: number) => {
  const response = await apiClient.get(`${BASE_URL}/audio/${placeId}`);
  return response.data.data;
};
