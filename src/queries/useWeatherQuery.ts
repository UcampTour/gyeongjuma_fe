import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../api/placeApi";

interface UseWeatherQueryParams {
  latitude?: number;
  longitude?: number;
}

export const useWeatherQuery = ({
  latitude,
  longitude,
}: UseWeatherQueryParams) => {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => getCurrentWeather(latitude!, longitude!),
    enabled: latitude !== undefined && longitude !== undefined,
    staleTime: 10 * 60 * 1000,
  });
};
