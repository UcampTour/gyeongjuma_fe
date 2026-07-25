import { usePlaceListQuery } from "../../queries/usePlaceListQuery";

export const usePlaceDetail = () => {
  const { data: placeList = [] } = usePlaceListQuery({
    latitude: 0,
    longitude: 0,
  });

  const getPlaceDetail = (placeId: number) => {
    const target = placeList.find((place) => place.placeId === placeId);
    return target;
  };
  return {
    getPlaceDetail,
  };
};
