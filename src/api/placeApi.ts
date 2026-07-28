import type {
  PlaceListBase,
  PlaceLocPrams,
  PlaceSearchParams,
} from "../models/PlaceModel";
import { apiClient } from "./apiClient";


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
  const response = await apiClient.get("/place", { params });
  return response.data.data;
};

/**
 * 관광지 방문 인증 처리
 * @param placeId
 * @param params
 * @returns
 */
export const certifyVisit = async (placeId: number, params: PlaceLocPrams) => {
  const response = await apiClient.post(
    `/visit/${placeId}?latitude=${params.latitude}&longitude=${params.longitude}`, // ?latitude=${params.latitude}&longitude=${params.longitude}
  );
  return response.data;
};
