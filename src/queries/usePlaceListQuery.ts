import { useQuery } from "@tanstack/react-query";
import { getPlaceList } from "../api/placeApi";
import type { PlaceSearchParams } from "../models/PlaceModel";
import { useAuthStore } from "../store/useAuthStore";

export const usePlaceListQuery = (params: PlaceSearchParams) => {
  const { member } = useAuthStore();
  const locale = member?.locale ?? "ko";

  return useQuery({
    queryKey: ["places", locale, params],
    queryFn: () => getPlaceList(params),
    // 위도, 경도 좌표가 실제로 존재할 때만 쿼리 자동 실행
    enabled: params.latitude !== undefined && params.longitude !== undefined,
  });
};
