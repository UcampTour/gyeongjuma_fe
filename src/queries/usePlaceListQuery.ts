import { useQuery } from "@tanstack/react-query";
import { getPlaceList } from "../api/placeApi";
import { useAuthStore } from "../store/useAuthStore";
interface PlaceListQueryParams {
  latitude?: number;
  longitude?: number;
}

export const usePlaceListQuery = ({
  latitude,
  longitude,
}: PlaceListQueryParams) => {
  const { member } = useAuthStore();
  const locale = member?.locale ?? "ko";

  return useQuery({
    queryKey: ["places", locale, latitude, longitude],

    queryFn: () =>
      getPlaceList({
        latitude: latitude!,
        longitude: longitude!,
      }),

    // 위도, 경도 좌표가 실제로 존재할 때만 쿼리 자동 실행
    enabled: latitude !== undefined && longitude !== undefined,
  });
};
