import React from "react";
import MapMarker from "./MapMarker";
import image from "../../assets/map/test_current_marker.png";

export interface CurrentLocationMarkerProps {
  map: any; // useKakaoMap 훅이 반환한 카카오맵 객체
  lat: number; // 위도
  lng: number; // 경도
}
const CurrentLocationMarker = ({
  map,
  lat,
  lng,
}: CurrentLocationMarkerProps) => {
  return (
    <MapMarker
      map={map}
      lat={lat}
      lng={lng}
      title="현재 위치"
      image={image}
      imageSize={{ width: 80, height: 80 }}
    />
  );
};

export default CurrentLocationMarker;
