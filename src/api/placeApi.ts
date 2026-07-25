import type {
  PlaceListBase,
  PlaceLocPrams,
  PlaceSearchParams,
} from "../models/PlaceModel";
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
  // const response = await api.get({
  //   url: `${BASE_URL}/place`,
  //   params: params,
  // });
  const response = await apiClient.get(`${BASE_URL}/place`, { params });
  return response.data.data;
};

/**
 * 관광지 방문 인증 처리
 * @param placeId
 * @param params
 * @returns
 */
export const certifyVisit = async (placeId: number, params: PlaceLocPrams) => {
  // const response = await api.post({
  //   url: `${BASE_URL}/visit/${placeId}`,
  //   params: params,
  // });

  const response = await apiClient.post(
    `${BASE_URL}/visit/${placeId}?latitude=${params.latitude}&longitude=${params.longitude}`, // ?latitude=${params.latitude}&longitude=${params.longitude}
    // {
    //   params,
    // },
    // {
    //   param: {
    //     lattitude: params.latitude,
    //     longitude: params.longitude,
    //   },
    // },
  );
  return response.data;
};

export interface VisitCertifyResponse {
  visitId: number;
  placeId: number;
  distanceMeters: number;
  radiusMeters: number;
}
// "status": "SUCCESS",
// "message": "방문 인증에 성공했습니다.",
// "data": {
//     "visitId": 30,
//     "placeId": 126209,
//     "distanceMeters": 1.802794826069598E-4,
//     "radiusMeters": 100.0
// },
// "timestamp": "2026-07-16 16:55:09"
