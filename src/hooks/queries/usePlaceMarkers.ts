import { useQuery } from "@tanstack/react-query";
import { getPlaceMarkers } from "../../api/placeApi";

export const usePlaceMarkers = () => {
  return useQuery({
    queryKey: ["placeMarkers"], // 캐시 이름
    queryFn: getPlaceMarkers,
  });
};
