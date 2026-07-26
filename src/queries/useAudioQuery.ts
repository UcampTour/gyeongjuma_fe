// queries/useAudioListQuery.ts

import { useQuery } from "@tanstack/react-query";
import { getAudioList } from "../api/audioApi";

export const useAudioQuery = (placeId?: number) => {
  return useQuery({
    queryKey: ["audioList", placeId],
    queryFn: () => getAudioList(placeId!),
    enabled: !!placeId,
  });
};
