import { dummyPlaceMarkerList } from "../data/map/mapMarkerList";

export const getPlaceMarkers = async () => {
  // const response = await api.get<PlaceMapMarker[]>({
  //   url: "/api/getPlaceMarkers",
  // });

  // return response.data;
  return dummyPlaceMarkerList;
};
