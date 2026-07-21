import { usePlaceList } from "../usePlaceList";

export const usePlaceDetail = () => {
  const { allPlaceList } = usePlaceList();

  const getPlaceDetail = (placeId: number) => {
    const target = allPlaceList.find((place) => place.placeId === placeId);
    return target;
  };
  return {
    getPlaceDetail,
  };
};
