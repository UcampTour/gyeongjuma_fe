/**
 * 오디오 api
 */

import { apiClient } from "./apiClient";

/**
 * 오디오 리스트 조회
 * @param placeId
 * @returns
 */
export const getAudioList = async (placeId: number) => {
  const response = await apiClient.get(`/audio/${placeId}`);
  return response.data.data;
};
