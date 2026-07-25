import type { PlaceListBase, PlaceSearchParams } from "../models/PlaceModel";
import { apiClient } from "./apiClient";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 관광지 목록 조회
 * @param {PlaceSearchParams} params
 * @returns {PlaceListBase[]}
 */
export const getPlaceList = async (
  params: PlaceSearchParams,
): Promise<PlaceListBase[]> => {
  const response = await apiClient.get(`${BASE_URL}/place`, {params});
  return response.data.data;
};
