import React from "react";
import type { PlaceMapMarker } from "../../models/MapModel";
import MapMarker from "./MapMarker";
import normalMarker from "../../assets/map/test_marker.png";
import visitedMarker from "../../assets/map/test_visited_marker.png";

/**
 *  관광지 마커 컴포넌트
 */
export interface PlaceMarkerProps {
  map: any; // useKakaoMap 훅이 반환한 카카오맵 객체
  place: PlaceMapMarker; // 관광지 정보
  onClick?: (place: PlaceMapMarker) => void; // 클릭 이벤트 핸들러
}
const PlaceMarker = ({ map, place, onClick }: PlaceMarkerProps) => {
  const image = place.isVisited ? visitedMarker : normalMarker;

  return (
    <MapMarker
      map={map}
      lat={place.lat}
      lng={place.lng}
      title={place.title}
      image={image}
      onClick={() => onClick?.(place)}
    />
  );
};

export default PlaceMarker;
