import type { CourseDetail, CourseListResponse } from "../models/CourseModel";
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
    `/visit/${placeId}?latitude=${params.latitude}&longitude=${params.longitude}`,
  );
  return response.data;
};

/**
 * 관광지 즐겨찾기 처리
 * @param placeId
 * @returns
 */
export const favoritePlace = async (placeId: number) => {
  const response = await apiClient.post(`/favorites/${placeId}`);
  return response.data;
};

/**
 * 위치 기반 현재 날씨 정보 조회
 * @param latitude
 * @param longitude
 * @returns
 */
export const getCurrentWeather = async (
  latitude: number,
  longitude: number,
) => {
  const response = await apiClient.get(`/weather`, {
    params: {
      latitude: latitude,
      longitude: longitude,
    },
  });
  return response.data.data;
};

/**
 * 코스 목록 조회
 */
export const getCourseList: () => Promise<CourseListResponse> = async () => {
  const response = await apiClient.get(`/courses`);
  return response.data.data;
};

/**
 * 코스 상세 조회
 * @param courseId
 * @returns
 */
export const getCourseDetail: (
  courseId: number,
) => Promise<CourseDetail> = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return response.data.data;
};
