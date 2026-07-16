import { useQuery } from "@tanstack/react-query";
import { getPlaceList } from "../api/placeApi";
import type { PlaceSearchParams } from "../models/PlaceModel";

export const usePlaceListQuery = (params: PlaceSearchParams) => {
  return useQuery({
    queryKey: ["places", params],
    queryFn: () => getPlaceList(params),
    // 위도, 경도 좌표가 실제로 존재할 때만 쿼리 자동 실행
    enabled:
      typeof params.latitude === "number" &&
      typeof params.longitude === "number",
  });
};
