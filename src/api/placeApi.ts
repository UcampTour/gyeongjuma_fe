import type { PlaceListBase, PlaceSearchParams } from "../models/PlaceModel";
import { apiClient } from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 관광지 목록 조회
 * @param {PlaceSearchParams} params
 * @returns {PlaceListBase[]}
 *
 * (공통 사용)
 * - 관광지 전체 목록 조회
 * - 현재 위치 기반 주변 장소 추천 목록 조회
 */
export const getPlaceList = async (
  params: PlaceSearchParams,
): Promise<PlaceListBase[]> => {
  const response = await apiClient.get(`${BASE_URL}/place`, {params});
  return response.data.data;
};
