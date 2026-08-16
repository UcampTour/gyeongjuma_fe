/**
 * 관광지 상세 화면에서 즐겨찾기 처리  후
 * 관광지 목록 캐싱 데이터를 업데이트하기 위한
 *
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritePlace } from "../../api/placeApi";
import type { PlaceListBase } from "../../models/PlaceModel";

export const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeId: number) => favoritePlace(placeId),

    onMutate: async (placeId) => {
      await queryClient.cancelQueries({
        queryKey: ["places"],
      });

      queryClient.setQueriesData<PlaceListBase[]>(
        { queryKey: ["places"] },
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((place) =>
            place.placeId === placeId
              ? {
                  ...place,
                  isFavorite: !place.isFavorite,
                }
              : place,
          );
        },
      );
    },

    onError: () => {
      // 서버 요청 실패 시 원래 상태로 되돌리는 로직 추가 가능
      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
    },
  });
};
